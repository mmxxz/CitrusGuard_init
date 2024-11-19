import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Get user's detections
router.get('/', auth, async (req, res) => {
  try {
    const detections = await prisma.detection.findMany({
      where: { userId: req.user.userId },
      include: { disease: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(detections);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create new detection
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Process image
    await sharp(req.file.path)
      .resize(800, 800, { fit: 'inside' })
      .jpeg({ quality: 80 })
      .toFile(path.join('uploads', 'processed-' + req.file.filename));

    // Create detection record
    const detection = await prisma.detection.create({
      data: {
        imageUrl: '/uploads/processed-' + req.file.filename,
        confidence: parseFloat(req.body.confidence),
        location: req.body.location,
        notes: req.body.notes,
        temperature: req.body.temperature ? parseFloat(req.body.temperature) : null,
        humidity: req.body.humidity ? parseFloat(req.body.humidity) : null,
        season: req.body.season,
        userId: req.user.userId,
        diseaseId: req.body.diseaseId
      },
      include: { disease: true }
    });

    // Create notification
    await prisma.notification.create({
      data: {
        type: 'detection',
        title: '新的病害检测',
        description: `检测到${detection.disease.name}，置信度${detection.confidence}%`,
        userId: req.user.userId
      }
    });

    res.status(201).json(detection);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get detection by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const detection = await prisma.detection.findUnique({
      where: { id: req.params.id },
      include: { disease: true }
    });

    if (!detection) {
      return res.status(404).json({ error: 'Detection not found' });
    }

    if (detection.userId !== req.user.userId) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    res.json(detection);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
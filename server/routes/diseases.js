import express from 'express';
import { PrismaClient } from '@prisma/client';
import auth from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all diseases
router.get('/', async (req, res) => {
  try {
    const diseases = await prisma.disease.findMany();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get disease by ID
router.get('/:id', async (req, res) => {
  try {
    const disease = await prisma.disease.findUnique({
      where: { id: req.params.id }
    });
    
    if (!disease) {
      return res.status(404).json({ error: 'Disease not found' });
    }
    
    res.json(disease);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Admin routes below
router.use(auth);

// Create disease (admin only)
router.post('/', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const disease = await prisma.disease.create({
      data: req.body
    });
    
    res.status(201).json(disease);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update disease (admin only)
router.put('/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId }
    });

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const disease = await prisma.disease.update({
      where: { id: req.params.id },
      data: req.body
    });
    
    res.json(disease);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
import { PrismaClient } from '@prisma/client';

const diseases = [
  {
    id: "citrus-canker",
    name: "柑橘溃疡病",
    description: "一种严重的细菌性病害，会在果实、叶片和枝条上形成病斑",
    symptoms: [
      "叶片出现褐色凸起的病斑，周围有黄晕",
      "果实表面形成疤痕状病斑",
      "枝条上出现溃疡",
      "严重时导致落叶落果"
    ],
    treatments: [
      "及时清除病叶和病果",
      "使用铜制杀菌剂进行预防性喷施",
      "加强果园通风和排水",
      "避免在雨天进行修剪操作"
    ],
    imageUrl: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?auto=format&fit=crop&q=80&w=800",
    category: "diseases"
  },
  {
    id: "citrus-greening",
    name: "黄龙病",
    description: "一种毁灭性的细菌性病害，影响柑橘树的维管系统",
    symptoms: [
      "叶片呈现不规则黄化",
      "果实畸形、偏小、青果",
      "树势衰弱",
      "果实味道发苦"
    ],
    treatments: [
      "及时清除病树",
      "控制木虱种群",
      "加强营养管理",
      "定期监测和检查"
    ],
    imageUrl: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=800",
    category: "diseases"
  },
  {
    id: "citrus-scab",
    name: "疮痂病",
    description: "一种真菌性病害，主要危害叶片、果实和嫩枝",
    symptoms: [
      "叶片出现褐色疮痂状突起",
      "果实表面粗糙，有疤痕",
      "嫩枝出现疮痂",
      "影响果实商品价值"
    ],
    treatments: [
      "喷施保护性杀菌剂",
      "修剪通风透光",
      "清除病叶病果",
      "合理施肥"
    ],
    imageUrl: "https://images.unsplash.com/photo-1590337318156-3c99f84542b9?auto=format&fit=crop&q=80&w=800",
    category: "diseases"
  },
  {
    id: "citrus-aphid",
    name: "蚜虫",
    description: "常见害虫，通过吸食植物汁液危害柑橘",
    symptoms: [
      "叶片卷曲变形",
      "新梢生长受阻",
      "分泌蜜露引发煤污病",
      "严重影响树势"
    ],
    treatments: [
      "喷施杀虫剂",
      "利用天敌防治",
      "清除病叶",
      "控制蚂蚁"
    ],
    imageUrl: "https://images.unsplash.com/photo-1589244159943-460088ed2b89?auto=format&fit=crop&q=80&w=800",
    category: "pests"
  },
  {
    id: "citrus-mites",
    name: "柑橘锈螨",
    description: "微小害虫，造成果实锈化，影响商品价值",
    symptoms: [
      "果实表皮褐锈化",
      "叶片失绿发黄",
      "果面粗糙",
      "影响光合作用"
    ],
    treatments: [
      "喷施杀螨剂",
      "生物防治",
      "硫磺制剂防治",
      "调节水肥"
    ],
    imageUrl: "https://images.unsplash.com/photo-1588095210434-3a062445f093?auto=format&fit=crop&q=80&w=800",
    category: "pests"
  },
  {
    id: "zinc-deficiency",
    name: "缺锌",
    description: "常见的营养缺乏症状，影响生长发育",
    symptoms: [
      "叶片小型化",
      "叶脉间黄化",
      "节间缩短",
      "果实品质下降"
    ],
    treatments: [
      "叶面喷施硫酸锌",
      "土壤施用锌肥",
      "调节土壤pH值",
      "改良土壤"
    ],
    imageUrl: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=800",
    category: "nutrition"
  }
];

const prisma = new PrismaClient();

async function main() {
  // Seed diseases
  for (const disease of diseases) {
    await prisma.disease.upsert({
      where: { id: disease.id },
      update: {
        name: disease.name,
        description: disease.description,
        symptoms: JSON.stringify(disease.symptoms),
        treatments: JSON.stringify(disease.treatments),
        imageUrl: disease.imageUrl,
        category: disease.category
      },
      create: {
        id: disease.id,
        name: disease.name,
        description: disease.description,
        symptoms: JSON.stringify(disease.symptoms),
        treatments: JSON.stringify(disease.treatments),
        imageUrl: disease.imageUrl,
        category: disease.category
      }
    });
  }

  // Create admin user
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: '$2a$12$k8Y6JG3X.dqIOuJ8.2Z3WeSXq5QQ5J5zaPQwuCeNrG7KXf5ZaluGy', // "admin123"
      role: 'admin'
    }
  });

  console.log('Database has been seeded');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
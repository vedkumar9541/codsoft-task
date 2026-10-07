import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/current', async (req, res) => {
  try {
    const reading = await prisma.aQIReading.findFirst({
      orderBy: { timestamp: 'desc' }
    });
    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const readings = await prisma.aQIReading.findMany({
      orderBy: { timestamp: 'desc' },
      take: 24
    });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/hotspots', async (req, res) => {
  try {
    const junctions = await prisma.junction.findMany({
      orderBy: { aqi: 'desc' },
      take: 10
    });
    res.json(junctions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

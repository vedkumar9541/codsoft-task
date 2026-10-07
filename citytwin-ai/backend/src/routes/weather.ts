import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/current', async (req, res) => {
  try {
    const reading = await prisma.weatherReading.findFirst({
      orderBy: { timestamp: 'desc' }
    });
    res.json(reading);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/history', async (req, res) => {
  try {
    const readings = await prisma.weatherReading.findMany({
      orderBy: { timestamp: 'desc' },
      take: 24
    });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/forecast', (req, res) => {
  // Simulated 24h forecast
  const forecast = Array.from({ length: 24 }).map((_, i) => ({
    hour: i,
    temperature: 30 + Math.sin(i / 24 * Math.PI) * 10,
    condition: 'clear'
  }));
  res.json(forecast);
});

export default router;

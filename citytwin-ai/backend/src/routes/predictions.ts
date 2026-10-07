import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/', async (req, res) => {
  const { type, horizon } = req.query;
  try {
    const predictions = await prisma.prediction.findMany({
      where: {
        type: type ? String(type) : undefined,
        horizon: horizon ? String(horizon) : undefined
      },
      orderBy: { timestamp: 'desc' }
    });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/traffic', async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany({
      where: { type: 'traffic' },
      orderBy: { timestamp: 'desc' }
    });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/aqi', async (req, res) => {
  try {
    const predictions = await prisma.prediction.findMany({
      where: { type: 'aqi' },
      orderBy: { timestamp: 'desc' }
    });
    res.json(predictions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

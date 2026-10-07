import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/current', async (req, res) => {
  try {
    const junctions = await prisma.junction.findMany();
    const zoneData: Record<string, { count: number, congestion: number }> = {};
    
    junctions.forEach(j => {
      if (!zoneData[j.zone]) zoneData[j.zone] = { count: 0, congestion: 0 };
      zoneData[j.zone].count++;
      zoneData[j.zone].congestion += j.congestionLevel;
    });

    const summary = Object.keys(zoneData).map(zone => ({
      zone,
      avgCongestion: zoneData[zone].congestion / zoneData[zone].count
    }));

    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/history', async (req, res) => {
  const { junctionId, from, to } = req.query;
  try {
    const readings = await prisma.trafficReading.findMany({
      where: {
        junctionId: junctionId ? String(junctionId) : undefined,
        timestamp: {
          gte: from ? new Date(String(from)) : undefined,
          lte: to ? new Date(String(to)) : undefined
        }
      },
      orderBy: { timestamp: 'asc' }
    });
    res.json(readings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/hotspots', async (req, res) => {
  try {
    const junctions = await prisma.junction.findMany({
      orderBy: { congestionLevel: 'desc' },
      take: 10
    });
    res.json(junctions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/overview', async (req, res) => {
  // Mock overview data
  res.json({
    traffic: { today: 0.75, yesterday: 0.72, change: 4.1 },
    aqi: { today: 150, yesterday: 165, change: -9.0 },
    incidents: { today: 12, yesterday: 15, change: -20.0 }
  });
});

router.get('/trends', async (req, res) => {
  // Mock trend data
  const hours = Array.from({ length: 24 }).map((_, i) => `${i}:00`);
  res.json({
    labels: hours,
    traffic: hours.map(h => 0.5 + Math.random() * 0.4),
    aqi: hours.map(h => 100 + Math.random() * 100)
  });
});

router.get('/zones', async (req, res) => {
  try {
    const junctions = await prisma.junction.findMany();
    const zones = ['North', 'South', 'East', 'West', 'Central', 'South-West', 'North-West', 'North-East'];
    
    const zoneData = zones.map(zone => {
      const zoneJunctions = junctions.filter(j => j.zone === zone);
      const count = zoneJunctions.length || 1;
      return {
        zone,
        avgCongestion: zoneJunctions.reduce((sum, j) => sum + j.congestionLevel, 0) / count,
        avgAqi: zoneJunctions.reduce((sum, j) => sum + j.aqi, 0) / count,
        incidents: Math.floor(Math.random() * 5) // Mock incidents per zone
      };
    });
    
    res.json(zoneData);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

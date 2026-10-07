import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/state', async (req, res) => {
  try {
    const totalJunctions = await prisma.junction.count();
    const junctions = await prisma.junction.findMany();
    const avgCongestion = junctions.reduce((acc, j) => acc + j.congestionLevel, 0) / (totalJunctions || 1);
    const avgAqi = junctions.reduce((acc, j) => acc + j.aqi, 0) / (totalJunctions || 1);
    const avgSpeed = junctions.reduce((acc, j) => acc + j.avgSpeed, 0) / (totalJunctions || 1);
    
    const activeIncidentsCount = await prisma.emergencyIncident.count({
      where: { status: { in: ['reported', 'dispatched', 'responding'] } }
    });

    res.json({
      totalJunctions,
      avgCongestion,
      avgAqi,
      avgSpeed,
      activeIncidentsCount,
      totalVehiclesEstimated: Math.floor(avgCongestion * 100000)
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/junctions', async (req, res) => {
  const { zone } = req.query;
  try {
    const junctions = await prisma.junction.findMany({
      where: zone ? { zone: String(zone) } : undefined
    });
    res.json(junctions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/junctions/:id', async (req, res) => {
  try {
    const junction = await prisma.junction.findUnique({
      where: { id: req.params.id },
      include: {
        trafficReadings: { take: 10, orderBy: { timestamp: 'desc' } },
        sensors: true
      }
    });
    if (!junction) return res.status(404).json({ error: 'Not found' });
    res.json(junction);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/roads', async (req, res) => {
  try {
    const roads = await prisma.road.findMany();
    res.json(roads);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany();
    res.json(hospitals);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/sensors', async (req, res) => {
  try {
    const sensors = await prisma.sensor.findMany();
    res.json(sensors);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

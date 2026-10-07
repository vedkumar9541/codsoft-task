import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/', async (req, res) => {
  const { type, severity, status } = req.query;
  try {
    const incidents = await prisma.emergencyIncident.findMany({
      where: {
        type: type ? String(type) : undefined,
        severity: severity ? String(severity) : undefined,
        status: status ? String(status) : { not: 'resolved' }
      },
      orderBy: { reportedAt: 'desc' }
    });
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const incident = await prisma.emergencyIncident.findUnique({
      where: { id: req.params.id }
    });
    if (!incident) return res.status(404).json({ error: 'Not found' });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const incident = await prisma.emergencyIncident.create({
      data: req.body
    });
    res.status(201).json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const incident = await prisma.emergencyIncident.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(incident);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

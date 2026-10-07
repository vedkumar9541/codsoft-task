import { Router } from 'express';
import { prisma } from '../prisma';

const router = Router();

router.get('/', async (req, res) => {
  const { type, severity, acknowledged } = req.query;
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        type: type ? String(type) : undefined,
        severity: severity ? String(severity) : undefined,
        acknowledged: acknowledged ? acknowledged === 'true' : undefined
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/acknowledge', async (req, res) => {
  try {
    const alert = await prisma.alert.update({
      where: { id: req.params.id },
      data: { acknowledged: true }
    });
    res.json(alert);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;

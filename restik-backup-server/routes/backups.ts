import { Router } from 'express';
import { Backup } from '../models/Backup';

const router = Router();

// Get all backups
router.get('/', async (req, res) => {
  try {
    const backups = await Backup.findAll();
    res.json(backups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get backups by location ID
router.get('/location/:locationId', async (req, res) => {
  try {
    const backups = await Backup.findAll({ where: { locationId: req.params.locationId } });
    res.json(backups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

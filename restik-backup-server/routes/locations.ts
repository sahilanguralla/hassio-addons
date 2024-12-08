import { Router } from 'express';
import { Location } from '../models/Location';
import { scheduleTask } from '../scripts/cronHandler';

const router = Router();

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.findAll();
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new location
router.post('/', async (req, res) => {
  try {
    const location = await Location.create(req.body);
    scheduleTask(location);
    res.status(201).json(location);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a location
router.put('/:id', async (req, res) => {
  try {
    await Location.update(req.body, { where: { id: req.params.id } });
    const updatedLocation = await Location.findByPk(req.params.id);
    scheduleTask(updatedLocation);
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a location
router.delete('/:id', async (req, res) => {
  try {
    await Location.destroy({ where: { id: req.params.id } });
    // Remove the cron job
    scheduleTask(null, parseInt(req.params.id));
    res.sendStatus(200);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;

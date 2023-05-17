import express from 'express';
import Events from '../models/eventsModel.js';

const eventsRoute = express.Router();

// Get all events
eventsRoute.get('/all', async (req, res) => {
  try {
    const events = await Events.find();
    res.send(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add an event
eventsRoute.post('/add', async (req, res) => {
  try {
    const newEvent = new Events({
      startAt: req.body.startAt,
      endAt: req.body.endAt,
      summary: req.body.summary,
      color: req.body.color
    });

    const event = await newEvent.save();
    res.status(201).send(event);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

// Count events
eventsRoute.get('/countEvents', async (req, res) => {
  try {
    const countEvents = await Events.countDocuments();
    res.status(200).json({ count: countEvents });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default eventsRoute;

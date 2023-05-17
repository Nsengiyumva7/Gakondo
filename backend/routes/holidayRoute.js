import express from 'express';
import Holidays from '../models/holidaysModel.js';

const holidaysRoute = express.Router();

// Get all holidays
holidaysRoute.get('/all', async (req, res) => {
  try {
    const holidays = await Holidays.find();
    res.send(holidays);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new holiday
holidaysRoute.post('/add', async (req, res) => {
  try {
    const newHoliday = new Holidays({
      day: req.body.day,
      date: req.body.date,
      holiday: req.body.holiday,
    });

    const holiday = await newHoliday.save();
    res.status(201).send(holiday);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

// Count holidays
holidaysRoute.get('/countHolidays', async (req, res) => {
  try {
    const countHolidays = await Holidays.countDocuments();
    res.status(200).json({ count: countHolidays });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default holidaysRoute;

import express from 'express';
import Medecine from '../models/medecineModel.js';

const medecineRoute = express.Router();

// Get all medicines
medecineRoute.get('/all', async (req, res) => {
  try {
    const medicines = await Medecine.find();
    res.send(medicines);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add a new medicine
medecineRoute.post('/add', async (req, res) => {
  try {
    const newMedecine = new Medecine({
      medecineId: req.body.medecineId,
      Name: req.body.Name,
      disease: req.body.disease,
      availability: req.body.availability,
    });

    const medecine = await newMedecine.save();
    res.status(201).send(medecine);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

// Count medicines
medecineRoute.get('/countMedecine', async (req, res) => {
  try {
    const countMedecine = await Medecine.countDocuments();
    res.status(200).json({ count: countMedecine });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default medecineRoute;

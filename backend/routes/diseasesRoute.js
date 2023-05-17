import express from 'express';
import Diseases from '../models/diseasesModel.js';

const diseasesRoute = express.Router();

// Add a disease
diseasesRoute.post('/add', async (req, res) => {
    try {
      const newDisease = new Diseases({
        diseaseName: req.body.diseaseName,
        diseaseSymptoms: req.body.diseaseSymptoms,
        diseaseMedecine: req.body.diseaseMedecine,
        totalMedecine: req.body.totalMedecine
      });
  
      const disease = await newDisease.save();
      res.status(201).send(disease);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
  
        // Extract and collect individual validation errors
        for (let field in error.errors) {
          validationErrors[field] = error.errors[field].message;
        }
  
        res.status(400).send(validationErrors);
      } else {
        res.status(500).send(error.message);
      }
    }
  });

// Get all diseases
diseasesRoute.get('/all', async (req, res) => {
  try {
    const diseases = await Diseases.find();
    res.send(diseases);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default diseasesRoute;

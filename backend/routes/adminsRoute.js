import express from "express";
import Admins from "../models/adminsModel.js";
import bcrypt from 'bcryptjs';

const adminsRoute = express.Router();

// Add admin credentials
adminsRoute.post('/add', async (req, res) => {
  try {
    const { adminId, adminName, adminPassword, adminIs } = req.body;

    // Check if admin with the same adminId already exists
    const existingAdmin = await Admins.findOne({ adminId });

    if (existingAdmin) {
      return res.status(409).send({ message: 'AdminId already exists!' });
    }

    // Hash the adminPassword
    const hashedPassword = bcrypt.hashSync(adminPassword);

    const newAdmin = new Admins({
      adminId,
      adminName,
      adminPassword: hashedPassword,
      adminIs
    });

    const admin = await newAdmin.save();
    res.status(201).send({
      _id: admin._id,
      adminId: admin.adminId,
      adminName: admin.adminName,
      adminIs: admin.adminIs
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Login admin
adminsRoute.post('/login', async (req, res) => {
  try {
    const { adminId, adminPassword } = req.body;

    const admin = await Admins.findOne({ adminId });

    if (admin && bcrypt.compareSync(adminPassword, admin.adminPassword)) {
      res.send({
        _id: admin._id,
        adminId: admin.adminId,
        adminName: admin.adminName,
        adminIs: admin.adminIs
      });
    } else {
      res.status(401).send({ message: 'Invalid AdminId or AdminPassword!' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update admin
adminsRoute.put('/update', async (req, res) => {
  try {
    const admin = await Admins.findById(req.body._id);

    if (admin) {
      admin.adminId = req.body.adminId || admin.adminId;
      admin.adminName = req.body.adminName || admin.adminName;

      if (req.body.newPassword) {
        admin.adminPassword = bcrypt.hashSync(req.body.newPassword);
      }

      const updatedAdmin = await admin.save();
      res.send({
        _id: updatedAdmin._id,
        adminId: updatedAdmin.adminId,
        adminName: updatedAdmin.adminName,
        adminIs: updatedAdmin.adminIs
      });
    } else {
      res.status(401).send({ message: 'Admin not Found!' });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default adminsRoute;

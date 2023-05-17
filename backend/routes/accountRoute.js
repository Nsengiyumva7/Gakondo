import express from 'express';
import Accounts from '../models/accountsModel.js';

const accountsRoute = express.Router();

// Get all accounts
accountsRoute.get('/all', async (req, res) => {
  try {
    const accounts = await Accounts.find();
    res.send(accounts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Add account credentials
accountsRoute.post('/add', async (req, res) => {
  try {
    const {
      invoiceNo,
      driver,
      phone,
      clients,
      type,
      status,
      amount
    } = req.body;

    // Check if account with the same invoiceNo already exists
    const existingAccount = await Accounts.findOne({ invoiceNo });

    if (existingAccount) {
      return res.status(409).send({ message: 'Invoice number already exists!' });
    }

    const newAccount = new Accounts({
      invoiceNo,
      driver,
      phone,
      clients,
      type,
      status,
      amount
    });

    const account = await newAccount.save();
    res.status(201).send({
      _id: account._id,
      invoiceNo: account.invoiceNo,
      driver: account.driver,
      phone: account.phone,
      clients: account.clients,
      type: account.type,
      status: account.status,
      amount: account.amount
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete account

// Count accounts
accountsRoute.get('/countAccounts', async (req, res) => {
  try {
    const countAccounts = await Accounts.countDocuments();
    res.status(200).json({ count: countAccounts });
  } catch (error) {
    console.log(error.message);
  }
});

export default accountsRoute;

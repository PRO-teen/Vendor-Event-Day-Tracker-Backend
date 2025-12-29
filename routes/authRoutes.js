const express = require('express');
const Vendor = require('../models/Vendor');

const router = express.Router();

// Mock login
router.post('/login', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  let vendor = await Vendor.findOne({ email });

  if (!vendor) {
    vendor = await Vendor.create({ email });
  }

  res.json({
    message: 'Login successful',
    vendorId: vendor._id,
    email: vendor.email,
  });
});

module.exports = router;

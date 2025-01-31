const express = require('express');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const PrintJob = require('../models/PrintJob');
const User = require('../models/User');

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Endpoint to handle file uploads and store print options
router.post('/print', upload.single('file'), async (req, res) => {
  try {
    const { userId, copies, size, color, sides, pages, schedule } = req.body;
    const printId = uuidv4();

    // Upload file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'print_jobs',
    });

    const newPrintJob = new PrintJob({
      printId,
      userId,
      file: result.secure_url,
      copies,
      size,
      color,
      sides,
      pages,
      schedule,
    });

    await newPrintJob.save();

    res.status(201).json({ message: 'Print job created successfully', printId });
  } catch (error) {
    console.error('Error creating print job:', error);
    res.status(500).json({ message: 'Error creating print job', error: error.message });
  }
});

// Endpoint to get all print jobs
router.get('/print-jobs', async (req, res) => {
  try {
    const printJobs = await PrintJob.find().populate('userId', 'name email');
    res.json(printJobs);
  } catch (error) {
    console.error('Error fetching print jobs:', error);
    res.status(500).json({ message: 'Error fetching print jobs', error: error.message });
  }
});

module.exports = router;
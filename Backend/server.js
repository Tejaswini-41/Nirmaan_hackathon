require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const PrintJob = require('./models/PrintJob'); 
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.static('uploads'));
app.use(cors()); // Enable CORS

// Import Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to handle file uploads and store print options
app.post('/api/print', upload.single('file'), async (req, res) => {
  try {
    const { printer, copies, size, color, sides, pages, schedule } = req.body;
    const printId = uuidv4();

    if (!pages) {
      return res.status(400).json({ message: 'pls, select pages to print' });
    }

    const newPrintJob = new PrintJob({
      printId,
      file: req.file.filename,
      printer,
      copies,
      size,
      color,
      sides,
      pages,
      schedule,
    });

    await newPrintJob.save();

    console.log({ message: 'Print job created successfully', printId })
  } catch (error) {
    console.error('Error creating print job:', error);
    res.status(500).json({ message: 'Error creating print job', error: error.message });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

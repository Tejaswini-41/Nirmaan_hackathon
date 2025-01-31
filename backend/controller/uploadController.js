import multer from 'multer';
import storage from '../config/multerStorage.js';
import File from '../models/File.js';

const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    const file = new File({
      url: req.file.path,
      public_id: req.file.filename,
      transactionComplete: false, // Set transactionComplete to false initially
    });
    await file.save();
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload file' });
  }
};

export const uploadMiddleware = upload.single('file');

export const completeTransaction = async (req, res) => {
  try {
    const { fileId } = req.params;
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }
    file.transactionComplete = true;
    await file.save();
    res.json({ message: 'Transaction completed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to complete transaction' });
  }
};
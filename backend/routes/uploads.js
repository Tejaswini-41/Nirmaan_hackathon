import express from 'express';
import { uploadFile, uploadMiddleware, completeTransaction } from '../controller/uploadController.js';

const router = express.Router();

router.post('/upload', uploadMiddleware, uploadFile);
router.patch('/complete-transaction/:fileId', completeTransaction);
router.get('/files', async (req, res) => {
  try {
    const { transactionComplete } = req.query;
    const files = await File.find({ transactionComplete: transactionComplete === 'true' });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
});

export default router;
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  public_id: {
    type: String,
    required: true,
  },
  transactionComplete: {
    type: Boolean,
    default: false,
  },
});

const File = mongoose.model('File', fileSchema);

export default File;
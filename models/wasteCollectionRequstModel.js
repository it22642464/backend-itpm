import mongoose from 'mongoose';

const wasteCollectionSchema = new mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  name: {
    type: String,
    required: true
  },
  email: { type: String,
     required: true},
  phone: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  wasteType: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Accepted', 'Rejected'],
    default: 'Pending'
  },
}, { timestamps: true });// Automatically adds 'createdAt' and 'updatedAt' fields

const WasteCollection = mongoose.model("WasteCollection", wasteCollectionSchema);

export default WasteCollection;
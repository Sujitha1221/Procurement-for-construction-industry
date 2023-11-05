import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  purchaseRef: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  concern: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery;

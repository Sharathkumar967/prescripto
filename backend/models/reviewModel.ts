import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  docId: { type: String, required: true },
  userId: { type: String, required: true },
  appointmentId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  date: { type: Number, required: true },
});

const reviewModel = mongoose.models.review || mongoose.model('review', reviewSchema);

export default reviewModel;

import mongoose from "mongoose";

const CarouselSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const Carousel = mongoose.models.carousel || mongoose.model('carousel', CarouselSchema);

export default Carousel;
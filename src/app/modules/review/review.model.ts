import { model, Schema, Types } from 'mongoose';
import { IReview } from './review.interface';

const reviewSchema = new Schema<IReview>(
  {
    //* review schema fields
    _id: {
      type: Types.ObjectId,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: 'MealProvider',
      required: true,
    },
    mealId: {
      type: Schema.Types.ObjectId,
      ref: 'Meal',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    review: {
      type: String,
      required: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

// pre save middleware/hook
reviewSchema.pre('save', async function (next) {
  next();
});

// post save middleware/hook
reviewSchema.post('save', function (doc, next) {
  next();
});

reviewSchema.pre('updateOne', async function (next) {
  next();
});
export const Review = model<IReview>('Review', reviewSchema);

import { model, Schema, Types } from 'mongoose';
import { IMeal } from './meal.interface';

const mealSchema = new Schema<IMeal>(
  {
    //* meal schema fields

    _id: {
      type: Types.ObjectId,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'MealProvider',
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
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
mealSchema.pre('save', async function (next) {
  next();
});

// post save middleware/hook
mealSchema.post('save', function (doc, next) {
  next();
});

mealSchema.pre('updateOne', async function (next) {
  next();
});
export const Meal = model<IMeal>('Meal', mealSchema);

import { model, Schema } from 'mongoose';
import { IMealProvider } from './mealProvider.interface';

const mealProviderSchema = new Schema<IMealProvider>(
  {
    //* mealProvider schema fields
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    cuisineSpecialties: {
      type: [String],
    },
    rating: {
      type: Number,
      default: 0,
    },
    totalOrders: {
      type: Number,
      default: 0,
    },
    experience: {
      type: String,
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
mealProviderSchema.pre('save', async function (next) {
  next();
});

// post save middleware/hook
mealProviderSchema.post('save', function (doc, next) {
  next();
});

mealProviderSchema.pre('updateOne', async function (next) {
  next();
});
export const MealProvider = model<IMealProvider>(
  'MealProvider',
  mealProviderSchema,
);

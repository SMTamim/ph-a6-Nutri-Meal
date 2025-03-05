import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';
import { ORDER_STATUS } from './order.constant';

const orderSchema = new Schema<IOrder>(
  {
    //* order schema fields
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
    status: {
      type: String,
      required: true,
      enum: [...Object.keys(ORDER_STATUS)],
    },
    price: {
      type: Number,
      required: true,
    },
    instruction: {
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
orderSchema.pre('save', async function (next) {
  next();
});

// post save middleware/hook
orderSchema.post('save', function (doc, next) {
  next();
});

orderSchema.pre('updateOne', async function (next) {
  next();
});
export const Order = model<IOrder>('Order', orderSchema);

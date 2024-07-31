import exp from "constants";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        items: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "menus",
        }],
        total: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "cancelled"],
            default: "pending",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "restaurants",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models.orders || mongoose.model("orders", orderSchema);

export default Order;

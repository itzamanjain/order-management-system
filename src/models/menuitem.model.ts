import exp from "constants";
import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Name must be at most 50 characters long"],
        },
        cuisine: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Cuisine must be at most 50 characters long"],
        },
        description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, "Description must be at most 500 characters long"],
        },
        price: {
        type: Number,
        required: true,
        },
        imageUrl: {
        type: String,
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

const MenuItem = mongoose.models.menuitems || mongoose.model("menuitems", menuItemSchema);

export default MenuItem;
import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
    {
        name: {
        type: String,
        required: true,
        trim: true,
        maxlength: [50, "Name must be at most 50 characters long"],
        },
        description: {
        type: String,
        required: true,
        trim: true,
        maxlength: [500, "Description must be at most 500 characters long"],
        },
        location: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, "Location must be at most 100 characters long"],
        },
        phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: [15, "Phone number must be at most 15 characters long"],
        },
        ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        },
        menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "menus",
        }],
        reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "reviews",
        }],
    },
    {
        timestamps: true,
    }
    );

const Restaurant = mongoose.models.restaurants || mongoose.model("restaurants", restaurantSchema);

export default Restaurant;
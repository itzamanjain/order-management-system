import mongoose, { Document, Model } from "mongoose";

// Define the interface for the User document
export interface IUser extends Document {
  email: string;
  password: string;
  fullname: string;
  username: string;
  role: string;
  orders?: mongoose.Types.ObjectId[];
  restaurantId?: mongoose.Types.ObjectId;
 
}

// Define the user schema
const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"]
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters long"],
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, "Full name must be at most 50 characters long"],
    },
    role:{
        type: String,
        enum: ["foodie", "restaurant owner"],
        default: "foodie",
        
    },
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "restaurants",
    },
    orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
    }],
  },
  {
    timestamps: true,
  }
);

// Define the User model
const User: Model<IUser> = mongoose.models.users || mongoose.model<IUser>("users", userSchema);

export default User;

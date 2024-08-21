import { connectDb } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helper/getdatafromtoken";
import Restaurant from "@/models/restaurant.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { name, description, location, phone } = reqBody;

        if (!name || !description || !location || !phone) {
            return NextResponse.json(
                { message: "Please fill in all fields" },
                { status: 400 }
            );
        }

        // Get the user ID from the token
        const ownerId = getDataFromToken(request);

        // Check if the restaurant already exists
        const existingRestaurant = await Restaurant.findOne({ ownerId });

        if (existingRestaurant) {
            return NextResponse.json(
                { message: "Restaurant already exists" },
                { status: 400 }
            );
        }

        // Create a new restaurant
        const newRestaurant = new Restaurant({
            name,
            description,
            location,
            phone,
            ownerId
        });

        const savedRestaurant = await newRestaurant.save();

        // Update the user's document by setting the restaurantId
        const updatedUser = await User.findByIdAndUpdate(
            {_id:ownerId},
            {
                restaurantId: savedRestaurant._id,
                role: "restaurant owner" // Update role if necessary
            },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return NextResponse.json(
                { message: "Failed to update user with restaurantId" },
                { status: 500 }
            );
        }

        return NextResponse.json({
            message: "Restaurant created successfully",
            success: true,
            savedRestaurant,
        }, { status: 201 });

    } catch (error: any) {
        console.error("Failed to create Restaurant:", error);
        return NextResponse.json(
            { message: "Failed to create Restaurant" },
            { status: 500 }
        );
    }
}

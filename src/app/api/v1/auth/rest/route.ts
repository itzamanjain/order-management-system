import { connectDb } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helper/getdatafromtoken";
import Restaurant from "@/models/restaurant.model"
import { NextRequest, NextResponse } from "next/server";


connectDb();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const { name,description,location,phone } = reqBody;

        if (!name || !description || !location || !phone) {
            return NextResponse.json(
                { message: "Please fill in all fields" },
                { status: 400 }
            );
        }

        const ownerId = getDataFromToken(request);

        const existingRestaurant = await Restaurant.findOne({phone});

        if(existingRestaurant){
            return NextResponse.json(
                { message: "Restaurant already exists" },
                { status: 400 }
            );
        }

        const newRestaurant = new Restaurant({
            name,
            description,
            location,
            phone,
            ownerId
        });

        const savedRestaurant = await newRestaurant.save();

        return NextResponse.json({
            message: "Restaurant created successfully",
            success: true,
            savedRestaurant,
        }, { status: 201 });

        

        
    } catch (error: any) {
        return NextResponse.json(
            { message: "Failed to create user" },
            { status: 500 }
        );
        
    }
}
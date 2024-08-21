import MenuItem from "@/models/menuitem.model";

import { connectDb } from "@/dbconfig/dbconfig";

import { NextRequest, NextResponse } from 'next/server'
import Restaurant from "@/models/restaurant.model";


connectDb();


export async function GET(request: NextRequest) {
    try {
        const res = await MenuItem.find();

        if (!res) {
            return NextResponse.json({ message: "No menu items found" }, { status: 404 })
        }

        const restaurantId = res[0].restaurantId;

        const restaurantName = await Restaurant.findById(
            restaurantId
        );

        if (!restaurantName) {
            return NextResponse.json({ message: "No restaurant found" }, { status: 404 })
        }

        // combine 

        return NextResponse.json({ message: "all the item fetched Successfully ",res }, {
            status: 200
        })
    } catch (error: any) {
        return NextResponse.json({ message: "Some thing Went wrong while fetching the menu items" }, { status: 500 })
    }
}
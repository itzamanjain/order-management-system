// fetch the restaurentId 

import { connectDb } from "@/dbconfig/dbconfig";
import User from '@/models/user.model'
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getdatafromtoken";

connectDb();


// send the restaurentId 


export async function GET(request:NextRequest){
    try {
        const ownerId = await getDataFromToken(request);

        const existingUser = await User.findOne({ _id: ownerId });
        if(!existingUser){
            return NextResponse.json({
                message:"User not found"
            })
        }

        const restaurantId = existingUser?.restaurantId;

        if(!restaurantId){
            return NextResponse.json({
                message:"Restaurant not found"
            })
        }

        return NextResponse.json({
            message:"Restaurant Id fetched successfully",
            restaurantId
        })  
        

    } catch (error:any) {
        return NextResponse.json({
            message:"error while geting rest id"
        })
    }
}
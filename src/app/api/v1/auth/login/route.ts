import { connectDb } from "@/dbconfig/dbconfig";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connectDb();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { message: "Please fill in all fields" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return NextResponse.json(
                { message: "User does not exist" },
                { status: 400 }
            );
        }

        const validPassword = await bcryptjs.compare(password, existingUser.password);
        if (!validPassword) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 400 }
            );
        }

        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
        };

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
            expiresIn: "1d",
        });

        const role = existingUser.role;

        // Check if the user has a restaurantId
        const hasRestaurant = !!existingUser.restaurantId;

        const response = NextResponse.json(
            { message: "Login successful", success: true, token, role, hasRestaurant },
            { status: 200 }
        );

        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (error: any) {
        console.error("Login failed:", error);
        return NextResponse.json(
            { message: "Login failed" },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from 'next/server';
import { connectDb } from '@/dbconfig/dbconfig';
import Restaurant from '@/models/restaurant.model';
import MenuItem from '@/models/menuitem.model';

connectDb();

export async function GET(request: NextRequest) {
  try {
    // Get restaurantId from query parameters
    const { searchParams } = new URL(request.url);
    const restaurantId = searchParams.get('id');

    if (!restaurantId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 400 });
    }

    // Find the restaurant by its ID
    const restaurant = await Restaurant.findById(restaurantId);
    
    if (!restaurant) {
      return NextResponse.json({ message: "Restaurant not found" }, { status: 404 });
    }

    // Find all menu items associated with this restaurant
    const menuItems = await MenuItem.find({ restaurantId: restaurantId });
    
    if (!menuItems || menuItems.length === 0) {
      return NextResponse.json({ message: "No items found" }, { status: 404 });
    }

    // Return the menu items
    return NextResponse.json({ message: "All items fetched successfully", menuItems }, { status: 200 });

  } catch (error: any) {
    console.error("Error while fetching menu items:", error.message);
    return NextResponse.json({ message: "Server error while fetching menu" }, { status: 500 });
  }
}

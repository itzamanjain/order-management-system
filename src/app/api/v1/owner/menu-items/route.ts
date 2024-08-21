import MenuItem from '@/models/menuitem.model';
import { connectDb } from '@/dbconfig/dbconfig';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import Restaurant from '@/models/restaurant.model';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

connectDb();

const uploadAvatar = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        transformation: [{ width: 400, height: 400, crop: 'thumb' }],
      },
      (error, result) => {
        if (result) {
          resolve(result.secure_url);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const name = data.get('name');
    const cuisine = data.get('cuisine');
    const description = data.get('description');
    const price = data.get('price');
    const image = data.get('image') as File;
    const restaurantId = data.get('restaurantId');

    if (!name || !cuisine || !description || !price || !image || !restaurantId) {
      return NextResponse.json(
        { message: 'Please fill all the fields' },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary and get imageUrl
    const buffer = Buffer.from(await image.arrayBuffer());
    const imageUrl = await uploadAvatar(buffer);
    console.log('Uploaded avatar URL:', imageUrl);

    // Create a new menu item
    const menuItem = new MenuItem({
      name,
      cuisine,
      description,
      price,
      imageUrl,
      restaurantId, // todo not coming in the body 
    });

    const newMenuItem = await menuItem.save();

    // Return the response
    return NextResponse.json(
      { message: 'Menu item uploaded successfully', newMenuItem },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('Error while uploading menu item:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

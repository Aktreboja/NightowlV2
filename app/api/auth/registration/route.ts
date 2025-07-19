import { NextResponse } from 'next/server';
import mongoClient from '@/lib/mongoClient';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const client = await mongoClient.connect();
    const db = client.db(process.env.MONGODB_DB_NAME);
    const users = db.collection('Users');

    const user = await users.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    const insertedUser = await users.insertOne({
      email,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    if (!insertedUser) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'User created' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

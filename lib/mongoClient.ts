import { MongoClient } from 'mongodb';

console.log('url: ', process.env.NEXT_PUBLIC_MONGODB_URI);
const mongoClient = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI!);

if (!mongoClient) {
  throw new Error('Failed to connect to MongoDB');
}

export default mongoClient;

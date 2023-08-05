import mongoose from "mongoose";

let isConnected = false; // track the connection
const DATABASE = `${process.env.MONGODB_URI}`;

const options: any = {
  dbName: "user",
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    let conn = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "images",
    });

    const db = conn.db;
    return { db, bucket: bucket! };
  }

  try {
    await mongoose.connect(DATABASE, options);

    isConnected = true;
    let conn = mongoose.connection;
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: "images",
    });
    const db = conn.db;
    console.log("MongoDB connected");
    return { db, bucket };
  } catch (error) {
    console.log(error);
  }
};

// utility to check if file exists
export async function fileExists(filename: string): Promise<boolean> {
  const { db }: any = await connectToDatabase();
  const count = await db
    .collection("images.files")
    .countDocuments({ filename });
  return !!count;
}

import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    return console.log("Missing MONGODB URL");
  }

  if (isConnected) {
    return console.log("MondoDb is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "DevFlow",
    });
    isConnected = true;
    console.log("Mongo Db is connected");
  } catch (error) {
    console.log("Mongo Db is failed", error);
  }
};

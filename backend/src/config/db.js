import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDatabase = async () => {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI is missing. Add it to your .env file.");
  }

  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
};

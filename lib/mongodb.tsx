import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Connected to MongoDb ");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectMongoDB;

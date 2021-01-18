import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// mongo db url
const dbUrl = process.env.mongoURL;

const dbconnection = () => {
  return mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export default dbconnection;

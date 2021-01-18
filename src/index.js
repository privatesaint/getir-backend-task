import mongoose from "mongoose";
import app from "./app";
import dbconnection from "./config/connection";
import logger from "./config/logger";

// app port
const PORT = process.env.PORT || 4500;

let server;
dbconnection().then(() => {
  console.log("connected");
  server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});

mongoose.connection.on("error", (error) => {
  logger.error({
    message: error.message,
    status: error.statusCode,
    stack: error.stack,
  });
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  process.exit(1);
});

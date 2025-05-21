const mongoose = require("mongoose");

const connectDb = async () => {
  if (!process.env.MONGO_URI) {
    console.log("Please add MONGO_UROI in .env file");
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `MongoDB is connected : ${conn.connection.host}`.underline.cyan
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = {
  connectDb,
};

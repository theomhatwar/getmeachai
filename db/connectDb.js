// import mongoose from "mongoose";

// const connectDb = async () => {
//   try {
//     const conn = await mongoose.connect(`mongodb://127.0.0.1:27017/chai`); // Use IPv4 (127.0.0.1) instead of localhost
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error("MongoDB connection error:", error.message);
//     process.exit(1);
//   }
// };

// export default connectDb;


//#######################################################################################################

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://theomhatwar:Om2004%40%40%40%40@cluster0.xpfjkuf.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

export default connectDb;









// U8cdRYwNUT9NmOMO
// seemahatwar
// mongodb+srv://<db_username>:<db_password>@cluster0.xpfjkuf.mongodb.net/
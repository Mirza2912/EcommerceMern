import mongoose from "mongoose";

const connectDatabase = async () => {
  await mongoose
    .connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`Database connection error: ${err.message}`);
    });
};
export { connectDatabase };

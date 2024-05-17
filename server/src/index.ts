import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/finanlcial-records";
import cors from "cors";

const app: Express = express();
dotenv.config();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

const mongoURI: string = process.env.MONGO_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => console.log("CONNECTED TO MONGODB!"))
  .catch((err: ErrorCallback) =>
    console.error("Failed do connect to MongoDB: ", err)
  );

app.use("/financial-records", financialRecordRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

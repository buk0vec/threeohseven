import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/user/signup", require("./routes/signup"));
app.use("/user/signin", require("./routes/signin"));
app.use("/user/validate", require("./routes/validate"));

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

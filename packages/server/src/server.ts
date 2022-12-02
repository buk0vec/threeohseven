import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Express + TypeScript Server");
});

app.use("/user/signup", require("./routes/signup"));
app.use("/user/signin", require("./routes/signin"));
app.use("/user/validate", require("./routes/validate"));
app.use("/user/signout", require("./routes/signout"));
app.use("/page", require("./routes/page"));

export default app;

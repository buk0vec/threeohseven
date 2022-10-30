import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import cookieParser from "cookie-parser"

import { createUser } from "./user-service"

interface ErrorResponse {
	code: string
}

interface ServerResponse<T> {
	error: boolean
	body: (T | ErrorResponse)
}

const app = express();
const port = 3000;

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get('/', (_, res) => {
	res.send('Express + TypeScript Server');
});

app.use('/user/signup', require("./routes/signup"))
app.use('/user/signin', require("./routes/signin"))
app.use('/user/validate', require("./routes/validate"))

app.listen(port, () => {
	console.log(`[server]: Server is running at https://localhost:${port}`);
});

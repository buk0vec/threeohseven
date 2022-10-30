import mongoose from "mongoose"
import type { Connection } from "mongoose"
import dotenv from "dotenv"

let dbConnection: Connection

dotenv.config()

function getDbConnection() {
	if (!dbConnection) {
		dbConnection = mongoose.createConnection(process.env.MONGODB_CONNECTION_URL ?? "");
	}
	return dbConnection;
}

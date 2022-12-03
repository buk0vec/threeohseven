import app from "./express-server";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || "3000";

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});

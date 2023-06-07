import { APP_TITLE } from "@scribbr-assessment-full-stack/common";
import cors from "cors";
import express from "express";
import { join } from "path";
import movieRoutes from "./routes/movieRoutes";
import { Pool } from "pg";

const PORT = 3000;

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT),
});

const app = express();
app.use(cors());

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(join(__dirname, "../../client/public")));

app.use("/api", movieRoutes(pool));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../../client/public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`${APP_TITLE}'s server listening at http://localhost:${PORT}`);
});

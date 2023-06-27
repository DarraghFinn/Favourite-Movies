import { APP_TITLE } from "@scribbr-assessment-full-stack/common";
import cors from "cors";
import express from "express";
import { join } from "path";
import Database from "./config/db";
import movieRoutes from "./routes/movieRoutes";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(cors());

// Serve static resources from the "public" folder (ex: when there are images to display)
app.use(express.static(join(__dirname, "../../client/public")));

app.use("/api", movieRoutes());

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../../client/public", "index.html"));
});

const database = new Database();
database
  .createTable()
  .then(() => {
    app.listen(PORT, () => {
      const message = `${APP_TITLE}'s server listening at http://localhost:${PORT}`;
      console.log(message);
    });
  })
  .catch((error) => {
    console.error(error);
    throw error;
  });

export default app;

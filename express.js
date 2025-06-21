const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/auths");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
let db;

async function startServer() {
  try {
    await client.connect();
    db = client.db("Filmstream_database");
    console.log("Connected to MongoDB");

    // Make db available to routes
    app.use((req, res, next) => {
      req.db = db;
      next();
    });

    // Register auth routes
    app.use("/api/auth", authRoutes);

    // Film info route
    app.get("/film-info/:filename", async (req, res) => {
      const { filename } = req.params;
      const film = await db.collection("films").findOne({ filename });

      if (film) {
        res.json(film);
      } else {
        res.status(404).json({ error: "Film not found" });
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB or start the server:", err);
    process.exit(1);
  }
}

startServer();
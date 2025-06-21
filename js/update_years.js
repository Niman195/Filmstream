const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const yearsByFilename = {
  "lotr_fellowship1.jpg": 2001,
  "lotr_twotowers.jpg": 2002,
  "lotr_return.jpg": 2003,
  "schindlers_list.jpg": 1993,
  "sleepy_hollow.jpg": 1999,
  "from_hell.jpg": 2001
};

async function updateYears() {
  try {
    await client.connect();
    const db = client.db("Filmstream_database");
    const collection = db.collection("films");

    for (const [filename, year] of Object.entries(yearsByFilename)) {
      const result = await collection.updateOne(
        { filename },
        { $set: { year } }
      );

    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

updateYears();
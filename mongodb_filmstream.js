const { connect } = require("http2");

const { MongoClient } = require ("mongodb");

const url = "mongodb://localhost:27017/";

const client = new MongoClient(url);

async function main() {
    await client.connect();

    const db = client.db("Filmstream_database");
};

main();
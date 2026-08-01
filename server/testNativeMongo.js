const { MongoClient } = require("mongodb");
require("dotenv").config();

async function run() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected using native MongoDB driver");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
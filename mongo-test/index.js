const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://gargijharnaskar99_db_user:YOUR_PASSWORD@expensevoucherdb.qxiqwme.mongodb.net/?appName=ExpenseVoucherDB";

async function main() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
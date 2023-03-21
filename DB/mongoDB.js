import { MongoClient } from "mongodb";

let dbConnection;
// Use IP instead of localhost

function connectToDb() {
  if (dbConnection != undefined) {
    return dbConnection;
  }
  const URI = "mongodb://127.0.0.1:27017";
  const client = new MongoClient(URI);

  dbConnection = client.db("hamsterwars");
  return dbConnection;
}

export function getCollection(name) {
  return connectToDb().collection(name);
}

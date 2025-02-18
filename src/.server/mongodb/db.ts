import { MongoClient } from "mongodb";
import { mongo_url } from ".server/env";

export const db = await new MongoClient(mongo_url)
  .connect()
  .then((c) => c.db("nonprofit_data"));

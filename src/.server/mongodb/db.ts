import { MongoClient } from "mongodb";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { mongo_url } from ".server/env";

const db = new MongoClient(mongo_url)
  .connect()
  .then((c) => c.db("better-giving"));
export const nonprofits = db.then((d) =>
  d.collection<NonprofitItem>("nonprofits")
);

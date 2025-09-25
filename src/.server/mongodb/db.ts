import { MongoClient } from "mongodb";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { mongodb_url } from ".server/env";

const db = new MongoClient(mongodb_url)
  .connect()
  .then((c) => c.db("better-giving"));
export const nonprofits = db.then((d) =>
  d.collection<NonprofitItem>("nonprofits")
);

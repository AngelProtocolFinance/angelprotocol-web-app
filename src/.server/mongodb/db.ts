import { MongoClient } from "mongodb";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { mongodb_url } from ".server/env";

const db = await MongoClient.connect(mongodb_url).then((x) =>
  x.db("better-giving")
);
export const nonprofits = db.collection<NonprofitItem>("nonprofits");

import {
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  data,
} from "@vercel/remix";
import { ObjectId } from "mongodb";
import { ITEMS_PER_PAGE } from "./constants";
import type { Nonprofit } from "./types";
import { db } from ".server/mongodb/db";

export interface LoaderData {
  nonprofits: Nonprofit[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = Number.parseInt(url.searchParams.get("page") || "1");
  const sortField = url.searchParams.get("sortField") || "name";
  const sortOrder = url.searchParams.get("sortOrder") || "asc";

  const skip = (page - 1) * ITEMS_PER_PAGE;

  // Properly type the sort for MongoDB
  const sortQuery: Record<string, 1 | -1> = {
    [sortField]: sortOrder === "asc" ? 1 : -1,
  };

  const [nonprofits, totalCount] = await Promise.all([
    db
      .collection<Nonprofit>("nonprofits")
      .find({})
      .sort(sortQuery)
      .skip(skip)
      .limit(ITEMS_PER_PAGE)
      .toArray(),
    db.collection("nonprofits").countDocuments({}),
  ]);

  return {
    nonprofits,
    totalCount,
    totalPages: Math.ceil(totalCount / ITEMS_PER_PAGE),
    currentPage: page,
  } satisfies LoaderData;
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const id = formData.get("id")?.toString();
  const action = formData.get("action")?.toString();

  if (!id || !action) {
    return data(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (action === "update") {
    const updateData: Partial<Nonprofit> = {
      contact_name: formData.get("contact_name")?.toString() || null,
      contact_email: formData.get("contact_email")?.toString() || null,
      migrate_to_hubspot: formData.get("migrate_to_hubspot") === "true",
      outreach_status: formData
        .get("outreach_status")
        ?.toString() as Nonprofit["outreach_status"],
      marketing_notes: formData.get("marketing_notes")?.toString() || null,
      last_outreach_date: formData.get("last_outreach_date")
        ? new Date(formData.get("last_outreach_date")?.toString() || "")
        : null,
      updated_at: new Date(),
    };

    await db
      .collection<Nonprofit>("nonprofits")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });
  }

  return data({ success: true });
}

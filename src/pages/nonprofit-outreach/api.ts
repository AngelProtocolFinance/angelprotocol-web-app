import type { ActionFunction, LoaderFunction } from "@vercel/remix";
import { nposParams } from "helpers/npos-params";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { nonprofits } from ".server/mongodb/db";

export interface LoaderData {
  items: NonprofitItem[];
  page: number;
  size: number;
  num_items: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const { filter, page, limit, sort } = nposParams(request);
  const skip = (page - 1) * limit;
  const [sort_key, sort_dir] = sort.split("+");

  const collection = await nonprofits;
  const items = await collection
    .find(filter)
    .sort(sort ? { [sort_key]: sort_dir === "asc" ? 1 : -1 } : {})
    .skip(skip)
    .limit(+limit)
    .toArray();
  const count = await collection.countDocuments(filter);

  return {
    items,
    page,
    size: limit,
    num_items: count,
  } satisfies LoaderData;
};

const headers = [
  "ein",
  "name",
  "website",
  "contact_name",
  "contact_email",
  "contact_role",
  "social_media",
  "donation_platform",
  "asset_code",
  "asset_amount",
  "income_code",
  "income_amount",
  "revenue_amount",
  "city",
  "state",
  "country",
  "ntee_code",
  "group_exemption_number",
  "subsection_code",
  "affilation_code",
  "classification_code",
  "deductibility_code",
  "deductibility_code_pub78",
  "foundation_code",
  "activity_code",
  "organization_code",
  "exempt_organization_status_code",
  "filing_requirement_code",
  "sort_name",
];
export const action: ActionFunction = async ({ request }) => {
  const { filter, sort } = nposParams(request);
  const [sort_key, sort_dir] = sort.split("+");

  const collection = await nonprofits;

  const count = await collection.countDocuments(filter);
  if (count > 100_000) {
    return new Response("Too many records", { status: 400 });
  }

  const source = collection
    .find(filter)
    .sort(sort ? { [sort_key]: sort_dir === "asc" ? 1 : -1 } : {})
    .stream();

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(`${Object.keys(headers).join(",")}\n`));
      source.on("data", (doc: NonprofitItem) => {
        const {
          ein,
          name,
          website,
          contacts: [c1, ...cn] = [],
          social_media: [s1, ...sn] = [],
          donation_platform,
          asset_code,
          asset_amount,
          income_code,
          income_amount,
          revenue_amount,
          city,
          state,
          country,
          ntee_code,
          group_exemption_number,
          subsection_code,
          affilation_code,
          classification_code,
          deductibility_code,
          deductibility_code_pub78,
          foundation_code,
          activity_code,
          organization_code,
          exempt_organization_status_code,
          filing_requirement_code,
          sort_name,
        } = doc;
        const row1 = [
          ein,
          name,
          website,
          c1?.name,
          c1?.email,
          c1?.role,
          s1?.url,
          donation_platform,
          asset_code,
          asset_amount,
          income_code,
          income_amount,
          revenue_amount,
          city,
          state,
          country,
          ntee_code,
          group_exemption_number,
          subsection_code,
          affilation_code,
          classification_code,
          deductibility_code,
          deductibility_code_pub78,
          foundation_code,
          activity_code,
          organization_code,
          exempt_organization_status_code,
          filing_requirement_code,
          sort_name,
        ];

        controller.enqueue(encoder.encode(`${row1.join(",")}\n`));

        for (const contact of cn) {
          if (!contact) continue;
          if (!contact.email) continue;
          //basic validation
          if (!contact.email.includes("@")) continue;

          const contactRow = [...row1];
          contactRow[3] = contact.name || "";
          contactRow[4] = contact.email || "";
          contactRow[5] = contact.role || "";
          controller.enqueue(encoder.encode(`${contactRow.join(",")}\n`));
        }
        for (const social of sn) {
          const socialRow = [...row1];
          socialRow[6] = social.url || "";
          controller.enqueue(encoder.encode(`${socialRow.join(",")}\n`));
        }
      });
      source.on("end", () => {
        controller.close();
      });
      source.on("error", (err) => {
        console.error(err);
        controller.error(err);
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="nonprofits.csv"`,
    },
  });
};

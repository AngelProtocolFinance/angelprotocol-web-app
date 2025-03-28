import type { LoaderFunction } from "@vercel/remix";
import { nposParams } from "helpers/npos-params";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { nonprofits } from ".server/mongodb/db";

const heads = [
  "ein",
  "name",
  "website",
  "contacts",
  "socials",
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

export const loader: LoaderFunction = async ({ request }) => {
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
      controller.enqueue(encoder.encode(`${heads.join(",")}\n`));
      source.on("data", (doc: NonprofitItem) => {
        const {
          ein,
          name,
          website,
          contacts,
          social_media,
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

        const cs = contacts?.map((c) => {
          if (!c) return;
          if (!c.email) return;
          if (!c.email.includes("@")) return;
          const { email, name = "_", role = "_" } = c;
          return `${name}#${email}#${role}`;
        });
        const cleanValue = (value: string | undefined) =>
          value?.replace(/,/g, "").replace(/\n/g, "").trim() ?? "";

        const row1 = [
          cleanValue(ein),
          cleanValue(name),
          cleanValue(website),
          cs
            ?.filter((x) => x)
            .map(cleanValue)
            .join("|") ?? "",
          social_media?.map((s) => cleanValue(s.url)).join("|") ?? "",
          cleanValue(donation_platform),
          cleanValue(asset_code),
          cleanValue(asset_amount?.toString()),
          cleanValue(income_code),
          cleanValue(income_amount?.toString()),
          cleanValue(revenue_amount?.toString()),
          cleanValue(city),
          cleanValue(state),
          cleanValue(country),
          cleanValue(ntee_code),
          cleanValue(group_exemption_number),
          cleanValue(subsection_code),
          cleanValue(affilation_code),
          cleanValue(classification_code),
          cleanValue(deductibility_code),
          cleanValue(deductibility_code_pub78?.join("|")),
          cleanValue(foundation_code),
          cleanValue(activity_code),
          cleanValue(organization_code),
          cleanValue(exempt_organization_status_code),
          cleanValue(filing_requirement_code),
          cleanValue(sort_name),
        ];

        controller.enqueue(encoder.encode(`${row1.join(",")}\n`));
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

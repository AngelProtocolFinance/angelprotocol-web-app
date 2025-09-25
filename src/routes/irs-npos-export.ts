import { format } from "date-fns";
import { resp } from "helpers/https";
import { npos_search } from "helpers/npos-search";
import type { LoaderFunction } from "react-router";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { cognito, to_auth } from ".server/auth";
import { nonprofits } from ".server/mongodb/db";

const heads = [
  "last_updated",
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
  const { user } = await cognito.retrieve(request);
  if (!user) return to_auth(request);
  if (!user.groups.includes("ap-admin")) throw resp.status(403);

  const { filter, sort } = npos_search(request);
  const [sort_key, sort_dir] = sort.split("+");

  const collection = await nonprofits;

  const count = await collection.countDocuments(filter);
  if (count > 100_000) return resp.err(400, "Too many records");

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
          last_updated,
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
        const clean_val = (value: string | undefined) =>
          value?.replace(/,/g, "").replace(/\n/g, "").trim() ?? "";

        const row1 = [
          clean_val(
            last_updated && format(new Date(last_updated), "yyyy-MM-dd")
          ),
          clean_val(ein),
          clean_val(name),
          clean_val(website),
          cs
            ?.filter((x) => x)
            .map(clean_val)
            .join("|") ?? "",
          social_media?.map((s) => clean_val(s.url)).join("|") ?? "",
          clean_val(donation_platform),
          clean_val(asset_code),
          clean_val(asset_amount?.toString()),
          clean_val(income_code),
          clean_val(income_amount?.toString()),
          clean_val(revenue_amount?.toString()),
          clean_val(city),
          clean_val(state),
          clean_val(country),
          clean_val(ntee_code),
          clean_val(group_exemption_number),
          clean_val(subsection_code),
          clean_val(affilation_code),
          clean_val(classification_code),
          clean_val(deductibility_code),
          clean_val(deductibility_code_pub78?.join("|")),
          clean_val(foundation_code),
          clean_val(activity_code),
          clean_val(organization_code),
          clean_val(exempt_organization_status_code),
          clean_val(filing_requirement_code),
          clean_val(sort_name),
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

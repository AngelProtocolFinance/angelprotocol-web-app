import type { LoaderFunction } from "@vercel/remix";
import { nposParams } from "helpers/npos-params";
import type { NonprofitItem } from "types/mongodb/nonprofits";
import { nonprofits } from ".server/mongodb/db";

const headers: { [K in keyof NonprofitItem]: K } = {
  _id: "_id",
  ein: "ein",
  name: "name",
  in_care_of_name: "in_care_of_name",
  street: "street",
  city: "city",
  state: "state",
  zip: "zip",
  group_exemption_number: "group_exemption_number",
  subsection_code: "subsection_code",
  affilation_code: "affilation_code",
  classification_code: "classification_code",
  ruling_date: "ruling_date",
  deductibility_code: "deductibility_code",
  foundation_code: "foundation_code",
  activity_code: "activity_code",
  organization_code: "organization_code",
  exempt_organization_status_code: "exempt_organization_status_code",
  tax_period: "tax_period",
  asset_code: "asset_code",
  income_code: "income_code",
  filing_requirement_code: "filing_requirement_code",
  pf_filing_requirement_code: "pf_filing_requirement_code",
  accounting_period: "accounting_period",
  asset_amount: "asset_amount",
  income_amount: "income_amount",
  revenue_amount: "revenue_amount",
  ntee_code: "ntee_code",
  sort_name: "sort_name",
  terminated: "terminated",
  last_updated: "last_updated",
  website: "website",
  contacts: "contacts",
  social_media: "social_media",
  donation_platform: "donation_platform",
};

export const loader: LoaderFunction = async ({ request }) => {
  const { filter, sort } = nposParams(request);
  const [sort_key, sort_dir] = sort.split("+");

  const collection = await nonprofits;
  const source = collection
    .find(filter)
    .sort(sort ? { [sort_key]: sort_dir === "asc" ? 1 : -1 } : {})
    .stream();

  const encoder = new TextEncoder();
  const output = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(`${Object.keys(headers).join(",")}\n`));
      source.on("data", (doc: NonprofitItem) => {
        controller.enqueue(
          encoder.encode(
            `${Object.values(headers)
              .map((k) => {
                type V =
                  | undefined
                  | null
                  | string
                  | number
                  | boolean
                  | object
                  | V[];
                function toStr(v: V) {
                  if (!v) return "";
                  if (typeof v === "object")
                    return {
                      [k]: Object.entries(v)
                        .map(([k, v]) => `${k}:${v}`)
                        .join("|"),
                    };

                  if (Array.isArray(v)) return v.join("|");
                  return v;
                }
                return toStr(doc);
              })
              .join(",")}\n`
          )
        );
      });
    },
  });
};

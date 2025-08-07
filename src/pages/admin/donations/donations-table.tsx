import CsvExporter from "components/csv-exporter";
import { humanize } from "helpers/decimal";
import { replaceWithEmptyString } from "helpers/replace-with-empty-string";
import { ArrowDownToLine } from "lucide-react";
import type { IPaginator } from "types/components";
import type { Donation } from "types/donations";
import type { Ensure } from "types/utils";
import Table from "./table";

interface Props extends IPaginator<Donation.Item> {}

const csvHeaders: {
  key: keyof Donation.Item | keyof Donation.KYC | "receipt";
  label: string;
}[] = [
  { key: "date", label: "Datetime" },
  { key: "program_name", label: "Program" },
  { key: "app_used", label: "Donation Origin" },
  { key: "payment_method", label: "Donation Type" },
  { key: "is_recurring", label: "Recurring Donation" },
  { key: "symbol", label: "Donation Asset" },
  { key: "init_amount", label: "Donation Amount" },
  { key: "init_amount_usd", label: "Donation Value USD" },
  { key: "id", label: "Transaction Hash" },
  { key: "receipt", label: "Receipt Provided" },
  { key: "full_name", label: "Full Name" },
  { key: "company", label: "Company" },
  { key: "kyc_email", label: "Email" },
  { key: "line1", label: "Address Line 1" },
  { key: "line2", label: "Address Line 2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zip_code", label: "Zip Code" },
  { key: "country", label: "Country" },
];

export interface CsvRow {
  date: string;
  program_name: string;
  app_used: string;
  payment_method: string;
  is_recurring: string;
  symbol: string;
  init_amount: string;
  final_amount_usd: string;
  id: string;
  receipt: string;
  full_name: string;
  kyc_email: string;
  company: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}

export default function DonationsTable({ classes = "", ...props }: Props) {
  return (
    <div className={classes}>
      <div className="grid w-full sm:flex items-center sm:justify-end mb-2 gap-2">
        <CsvExporter
          classes=" hover:text-blue"
          headers={csvHeaders}
          data={props.items
            .filter(
              (d): d is Ensure<Donation.Item, "donor_details"> =>
                !!d.donor_details
            )
            .map<CsvRow>(({ donor_details: donor, ...d }) => {
              return replaceWithEmptyString({
                date: new Date(d.date).toLocaleDateString(),
                program_name: d.program_name,
                app_used:
                  d.app_used === "bg-widget" ? "Donation Form" : "Marketplace",
                payment_method: d.payment_method,
                is_recurring: d.is_recurring ? "Yes" : "No",
                symbol: d.symbol,
                init_amount: humanize(d.init_amount, 2),
                final_amount_usd: humanize(d.final_amount_usd ?? 0, 2),
                id: d.id,
                receipt: donor.address?.country ? "Yes" : "No",
                full_name: donor.full_name,
                kyc_email: donor.kyc_email,
                company: donor.company,
                ...donor.address,
              });
            })}
          filename="received_donations.csv"
        >
          <ArrowDownToLine size={17} />
        </CsvExporter>
      </div>

      <div className="overflow-x-auto">
        <Table {...props} />
      </div>
    </div>
  );
}

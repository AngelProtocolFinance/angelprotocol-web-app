import type { IDonationFinal } from "@better-giving/donation";
import { CsvExporter } from "components/csv-exporter";
import { ArrowDownToLine } from "lucide-react";
import type { IPaginator } from "types/components";
import { type IRow, to_csv_row, to_row } from "./helpers";
import { Table } from "./table";

interface Props extends IPaginator<IDonationFinal> {}

const csv_headers: {
  key: keyof IRow;
  label: string;
}[] = [
  { key: "id", label: "id" },
  { key: "date", label: "date" },
  { key: "currency", label: "currency" },
  { key: "amount", label: "amount" },
  { key: "amount_usd", label: "usd_value" },
  { key: "net_usd", label: "net_usd" },
  { key: "program_name", label: "program" },
  { key: "payment_method", label: "payment method" },
  { key: "frequency", label: "frequency" },
  { key: "donation_origin", label: "donation origin" },
  { key: "donor_name", label: "donor name" },
  { key: "donor_company", label: "donor company" },
  { key: "donor_email", label: "donor email" },
  { key: "street", label: "street" },
  { key: "city", label: "city" },
  { key: "state", label: "state" },
  { key: "zip_code", label: "zip code" },
  { key: "country", label: "country" },
];

export function DonationsTable({ classes = "", items, ...props }: Props) {
  return (
    <div className={classes}>
      <div className="grid w-full sm:flex items-center sm:justify-end mb-2 gap-2">
        <CsvExporter
          classes=" hover:text-blue"
          headers={csv_headers}
          data={items.map<IRow>(to_csv_row)}
          filename="received_donations.csv"
        >
          <ArrowDownToLine size={17} />
        </CsvExporter>
      </div>

      <div className="overflow-x-auto">
        <Table {...props} items={items.map(to_row)} />
      </div>
    </div>
  );
}

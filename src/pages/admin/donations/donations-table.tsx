import { useFetcher, useSearchParams } from "@remix-run/react";
import CsvExporter from "components/csv-exporter";
import { Info } from "components/status";
import { humanize } from "helpers/decimal";
import { replaceWithEmptyString } from "helpers/replace-with-empty-string";
import { FileSpreadsheet } from "lucide-react";
import { useEffect, useState } from "react";
import type { Donation, DonationsPage } from "types/donations";
import type { Ensure } from "types/utils";
import Table from "./table";

interface Props {
  classes?: string;
  firstPage: DonationsPage;
}

export default function DonationsTable({ classes = "", firstPage }: Props) {
  const { data, state, load } = useFetcher<DonationsPage>(); //initially undefined
  const [params] = useSearchParams();
  const [items, setItems] = useState(firstPage.Items);

  useEffect(() => {
    if (!data || state === "loading") return;
    setItems((prev) => [...prev, ...(data.Items || [])]);
  }, [data, state]);

  if (items.length === 0) {
    return <Info>No donations found</Info>;
  }

  const nextPage = data ? data.nextPage : firstPage.nextPage;

  function loadNext() {
    if (!nextPage) throw `should not call load when there's no next page`;
    const n = new URLSearchParams(params);
    n.set("page", nextPage.toString());
    load(`?${n.toString()}`);
  }

  return (
    <div className={classes}>
      <div className="grid w-full sm:flex items-center sm:justify-end mb-2 gap-2">
        <CsvExporter
          classes="border border-blue text-blue-d1 hover:border-blue-l2 hover:text-blue rounded-sm px-4 py-2 text-sm"
          headers={csvHeaders}
          data={items
            .filter(
              (d): d is Ensure<Donation.Item, "donorDetails"> =>
                !!d.donorDetails
            )
            .map<Donation.Item | Donation.KYC>(
              ({ donorDetails: donor, ...d }) => {
                return replaceWithEmptyString({
                  date: new Date(d.date).toLocaleDateString(),
                  programName: d.programName,
                  appUsed:
                    d.appUsed === "bg-widget" ? "Donation Form" : "Marketplace",
                  paymentMethod: d.paymentMethod,
                  isRecurring: d.isRecurring ? "Yes" : "No",
                  symbol: d.symbol,
                  initAmount: humanize(d.initAmount, 2),
                  finalAmountUsd: humanize(d.finalAmountUsd ?? 0, 2),
                  id: d.id,
                  receipt: donor.address?.country ? "Yes" : "No",
                  fullName: donor.fullName,
                  kycEmail: donor.kycEmail,
                  ...donor.address,
                });
              }
            )}
          filename="received_donations.csv"
        >
          <FileSpreadsheet size={17} className="text-2xl" />
          Donation Records
        </CsvExporter>
      </div>

      <div className="overflow-x-auto">
        <Table
          donations={items}
          hasMore={!!nextPage}
          onLoadMore={loadNext}
          disabled={state === "loading"}
          isLoading={state === "loading"}
        />
      </div>
    </div>
  );
}

const csvHeaders: {
  key: keyof Donation.Item | keyof Donation.KYC | "receipt";
  label: string;
}[] = [
  { key: "date", label: "Datetime" },
  { key: "programName", label: "Program" },
  { key: "appUsed", label: "Donation Origin" },
  { key: "paymentMethod", label: "Donation Type" },
  { key: "isRecurring", label: "Recurring Donation" },
  { key: "symbol", label: "Donation Asset" },
  { key: "initAmount", label: "Donation Amount" },
  { key: "finalAmountUsd", label: "Donation Value USD" },
  { key: "id", label: "Transaction Hash" },
  { key: "receipt", label: "Receipt Provided" },
  { key: "fullName", label: "Full Name" },
  { key: "kycEmail", label: "Email" },
  { key: "line1", label: "Address Line 1" },
  { key: "line2", label: "Address Line 2" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "zipCode", label: "Zip Code" },
  { key: "country", label: "Country" },
];

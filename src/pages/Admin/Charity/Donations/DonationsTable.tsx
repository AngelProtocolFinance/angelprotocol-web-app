import CsvExporter from "components/CsvExporter";
import { Info } from "components/Status";
import { replaceWithEmptyString as fill, humanize } from "helpers";
import { useEffect, useRef, useState } from "react";
import { useFetcher, useSearchParams } from "react-router-dom";
import type { Donation } from "types/aws";
import type { Ensure } from "types/utils";
import Table from "./Table";
import type { Page } from "./types";
import { FileSpreadsheet } from "lucide-react";

interface Props {
  classes?: string;
  firstPage: Page;
}

export default function DonationsTable({ classes = "", firstPage }: Props) {
  const fetcher = useFetcher<Page>(); //initially undefined
  const [params] = useSearchParams();
  const [items, setItems] = useState(firstPage.Items);
  const pageRef = useRef(1);

  useEffect(() => {
    if (!fetcher.data || fetcher.state === "loading") return;
    if (fetcher.data) {
      setItems((prev) => [...prev, ...(fetcher.data?.Items || [])]);
      pageRef.current = pageRef.current + 1;
    }
  }, [fetcher.data, fetcher.state]);

  if (items.length === 0) {
    return <Info>No donations found</Info>;
  }

  const nextPage =
    pageRef.current > 1 ? fetcher.data?.nextPage : firstPage.nextPage;

  function loadNext() {
    if (!nextPage) throw `should not call load when there's no next page`;
    const n = new URLSearchParams(params);
    n.set("page", nextPage.toString());
    fetcher.load(`?${n.toString()}`);
  }

  return (
    <div className={classes}>
      <div className="grid w-full sm:flex items-center sm:justify-end mb-2 gap-2">
        <CsvExporter
          classes="border border-blue text-blue-d1 hover:border-blue-l2 hover:text-blue rounded px-4 py-2 text-sm"
          headers={csvHeaders}
          data={items
            .filter(
              (d): d is Ensure<Donation.Record, "donorDetails"> =>
                !!d.donorDetails
            )
            .map<Donation.Record | Donation.KYC>(
              ({ donorDetails: donor, ...d }) => {
                return fill({
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
          disabled={fetcher.state === "loading"}
          isLoading={fetcher.state === "loading"}
        />
      </div>
    </div>
  );
}

const csvHeaders: {
  key: keyof Donation.Record | keyof Donation.KYC | "receipt";
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

import type { ReactNode } from "react";
import { CSVLink } from "react-csv";
import type { CommonPropTypes } from "react-csv/components/CommonPropTypes";

type Props = CommonPropTypes & { classes?: string; children: ReactNode };

export default function CsvExporter(props: Props) {
  return (
    <CSVLink
      {...props}
      className={`flex gap-1 items-center ${props.classes ?? ""}`}
    >
      {props.children}
    </CSVLink>
  );
}

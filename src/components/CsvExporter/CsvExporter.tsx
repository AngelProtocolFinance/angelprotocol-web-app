import { CSVLink } from "react-csv";
import { CommonPropTypes } from "react-csv/components/CommonPropTypes";
import Icon from "../Icon";

type Props = CommonPropTypes & { classes?: string };

export default function CsvExporter(props: Props) {
  return (
    <CSVLink
      {...props}
      className={`flex gap-1 items-center ${props.classes ?? ""}`}
    >
      Save to CSV <Icon type="FileDownload" className="text-2xl" />
    </CSVLink>
  );
}

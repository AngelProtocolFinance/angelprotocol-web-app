import { CSVLink } from "react-csv";
import { Headers } from "react-csv/components/CommonPropTypes";
import Icon from "../Icon";

type Props = {
  headers: Headers;
  data: string | object[];
  filename: string;
};

export default function CsvExporter(props: Props) {
  return (
    <CSVLink
      {...props}
      className="flex gap-1 items-center max-h-10 bg-blue hover:bg-bright-blue px-2 py-1 rounded-md uppercase text-sm text-white/80 font-heading"
    >
      Save to CSV <Icon type="FileDownload" className="text-2xl" />
    </CSVLink>
  );
}

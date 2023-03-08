import { TableProps } from "./types";
import MobileTable from "./MobileTable";
import Table from "./Table";

export default function Transactions(props: TableProps) {
  return (
    <>
      <MobileTable classes="grid @md:hidden" {...props} />
      <Table classes="hidden @md:table" {...props} />
    </>
  );
}

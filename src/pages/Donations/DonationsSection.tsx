import MobileTable from "./MobileTable";
import Table from "./Table";
import { TableProps } from "./types";

export default function DonationsSection(props: Omit<TableProps, "classes">) {
  return (
    <div className="grid col-span-full">
      <Table {...props} classes="hidden max-lg:mt-4 lg:table" />
      <MobileTable {...props} classes="lg:hidden max-lg:my-4" />
    </div>
  );
}

import { PropsWithChildren } from "react";
import ListView from "./ListView";
import TableView from "./TableView";
import { CharityApplication } from "./types";

export default function ApplicationsTable(props: {
  applications: CharityApplication[];
  isError: boolean;
}) {
  if (props.isError) {
    return <Tooltip>failed to get applications..</Tooltip>;
  }
  return (
    <>
      <TableView applications={props.applications} />
      <ListView applications={props.applications} />
    </>
  );
}

function Tooltip(props: PropsWithChildren<{}>) {
  return <p className="text-white font-mono text-sm">{props.children}</p>;
}

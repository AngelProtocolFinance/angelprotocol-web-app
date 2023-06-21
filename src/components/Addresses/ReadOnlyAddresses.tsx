import { isEmpty } from "helpers";
import Info from "../Status/Info";
import TableSection, { Cells } from "../TableSection";

type Props = {
  addresses: string[];
  title: string;
  memberName: string;
  emptyMsg: string;
  classes?: string;
};

export function ReadOnlyAddresses({
  addresses,
  title,
  emptyMsg,
  classes = "",
}: Props) {
  return (
    <div className={`${classes} grid content-start border border-prim rounded`}>
      <h4 className="text-xl font-bold mb-8">{title}</h4>

      {isEmpty(addresses) ? (
        <Info>{emptyMsg}</Info>
      ) : (
        <table className="table-fixed rounded outline outline-1 outline-prim">
          <TableSection
            type="tbody"
            rowClass="border-b border-prim divide-x divide-prim last:border-none odd:bg-orange-l6 odd:dark:bg-blue-d7"
          >
            {addresses.map((a) => (
              <Row key={a} address={a} />
            ))}
          </TableSection>
        </table>
      )}
    </div>
  );
}

type RowProps = {
  address: string;
};

function Row({ address }: RowProps) {
  return (
    <Cells type="td" cellClass="py-3 px-4 text-sm">
      <div className="truncate w-24 sm:w-full">{address}</div>
    </Cells>
  );
}

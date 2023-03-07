import TableSection, { Cells } from "components/TableSection";
import Form, { Desc, FormProps, Title } from "../common/Form";
import NavButtons from "../common/NavButtons";
import Fee from "./Fee";

export default function FeesForm(props: FormProps) {
  return (
    <Form {...props}>
      <Title className="mb-2">Fees</Title>
      <Desc className="mb-8">
        Fees of 0.5% on balances and 2% on withdrawals are automatically sent to
        the protocol's treasury. Here, you can set additional fees that will be
        distributed to the address of your choice
      </Desc>
      <table className="max-sm:grid outline outline-1 outline-prim rounded w-full">
        <TableSection
          type="thead"
          classes="max-sm:grid max-sm:grid-cols-[3rem_1fr_5.5rem] max-sm:border-b border-prim"
          rowClass="max-sm:contents uppercase text-xs font-bold border-b border-prim bg-orange-l6 dark:bg-blue-d7"
        >
          <Cells
            type="th"
            cellClass="px-4 py-4 border-r border-prim last:border-r-0"
          >
            <th className="" />
            <th className="sm:hidden" />
            <th className="max-sm:col-start-3 max-sm:border-r-0">active</th>
            <th className="text-left max-sm:hidden">payout address</th>
            <th className="max-sm:hidden">rate</th>
          </Cells>
        </TableSection>
        <TableSection
          classes="max-sm:contents"
          type="tbody"
          rowClass="max-sm:grid max-sm:grid-cols-[3rem_1fr_5.5rem] border-b border-prim last:border-0 even:bg-orange-l6 even:dark:bg-blue-d7"
        >
          <Fee title="withdrawal fee" name="deposit" />
          <Fee title="deposit fee" name="withdrawal" />
          <Fee title="earnigs fee" name="earnings" />
        </TableSection>
      </table>
      <NavButtons curr={6} classes="mt-8" />
    </Form>
  );
}

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
      <table className="outline outline-1 outline-prim rounded w-full">
        <TableSection
          type="thead"
          rowClass="uppercase text-xs font-bold border-b border-prim divide-x divide-prim"
        >
          <Cells type="th" cellClass="px-4 py-4">
            <></>
            <>active</>
            <>payout address</>
            <>rate</>
          </Cells>
        </TableSection>
        <TableSection
          type="tbody"
          rowClass="border-b border-prim divide-x divide-prim last:border-0"
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

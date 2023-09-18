import { WithdrawMeta } from "types/tx";
import Image from "components/Image";
import TableSection, { Cells } from "components/TableSection";
import { humanize } from "helpers";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function Withdraw({ beneficiary, tokens }: WithdrawMeta) {
  return (
    <PreviewContainer>
      <KeyValue _key="beneficiary" _classes="flex-col gap-2 mt-1">
        <span className="text-sm">{beneficiary}</span>
      </KeyValue>

      <KeyValue _key="assets" _classes="flex-col mt-4 gap-2">
        <TableSection type="tbody" rowClass="">
          {tokens.map((t) => {
            return (
              <Cells key={t.symbol} cellClass="" type="td">
                <Image src={t.logo} className="w-5 h-5 rounded-full mr-2" />
                <>{humanize(t.amount, 4)}</>
                <span className="text-xs uppercase pl-2">{t.symbol}</span>
              </Cells>
            );
          })}
        </TableSection>
      </KeyValue>
    </PreviewContainer>
  );
}

import { WithdrawMeta } from "pages/Admin/types";
import TableSection, { Cells } from "components/TableSection";
import { condense, humanize } from "helpers";
import { symbols } from "constants/tokens";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function Withdraw({
  beneficiary,
  assets,
}: WithdrawMeta["data"]) {
  return (
    <PreviewContainer>
      <KeyValue _key="beneficiary">
        <span className="font-mono text-sm">{beneficiary}</span>
      </KeyValue>

      <TableSection type="tbody" rowClass="">
        {assets.map((asset) => {
          const denom =
            "native" in asset.info ? asset.info.native : asset.info.cw20;

          return (
            <Cells key={denom} cellClass="" type="td">
              <>{humanize(condense(asset.amount), 4)}</>
              <>{symbols[denom]}</>
            </Cells>
          );
        })}
      </TableSection>
    </PreviewContainer>
  );
}

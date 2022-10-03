import { WithdrawMeta } from "pages/Admin/types";
import TableSection, { Cells } from "components/TableSection";
import { condense, humanize } from "helpers";
import { tokens } from "constants/tokens";
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

      <KeyValue _key="assets" _classes="flex-col mt-4 gap-2">
        <TableSection type="tbody" rowClass="">
          {assets.map((asset) => {
            const denom =
              "native" in asset.info ? asset.info.native : asset.info.cw20;

            return (
              <Cells key={denom} cellClass="" type="td">
                <img
                  src={tokens[denom].icon}
                  className="w-5 h-5 rounded-full mr-2"
                  alt=""
                />
                <>{humanize(condense(asset.amount), 4)}</>
                <span className="text-xs font-mono uppercase pl-2">
                  {tokens[denom].symbol}
                </span>
              </Cells>
            );
          })}
        </TableSection>
      </KeyValue>
    </PreviewContainer>
  );
}

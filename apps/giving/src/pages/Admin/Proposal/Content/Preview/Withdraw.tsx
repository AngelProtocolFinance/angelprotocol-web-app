import { tokens } from "@giving/constants/tokens";
import { condense, humanize } from "@giving/helpers";
import { WithdrawMeta } from "@giving/types/pages/admin";
import TableSection, { Cells } from "components/TableSection";
import KeyValue from "./common/KeyValue";
import PreviewContainer from "./common/PreviewContainer";

export default function Withdraw({
  beneficiary,
  assets,
}: WithdrawMeta["data"]) {
  return (
    <PreviewContainer>
      <KeyValue _key="beneficiary" _classes="flex-col gap-2 mt-1">
        <span className="text-sm">{beneficiary}</span>
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
                <span className="text-xs uppercase pl-2">
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

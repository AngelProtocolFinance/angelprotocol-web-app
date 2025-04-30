import { toUsd } from "helpers/to-usd";
import { T, V } from "./components";
import { fs, fw, w } from "./styles";
interface Props {
  notGranted: number;
  savingsRate: number;
  investedRate: number;
  savings: number;
  invested: number;
}

export function Splits(v: Props) {
  return (
    <V
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 4,
        fontSize: fs.xxs,
        marginTop: w["6"],
      }}
    >
      <V style={{ width: "31%" }}>
        <T style={{ textAlign: "right", fontWeight: fw.sb }}>
          Annual Saved/Invested
        </T>
        <T style={{ textAlign: "right" }}>{toUsd(v.notGranted)}</T>
      </V>
      <V style={{ width: "31%" }}>
        <T style={{ textAlign: "right" }}>
          <T style={{ fontWeight: fw.sb }}>Annual Saved</T> (
          {(v.savingsRate * 100).toFixed(0)}%)
        </T>
        <T style={{ textAlign: "right" }}>{toUsd(v.savings)}</T>
      </V>
      <V style={{ width: "31%" }}>
        <T style={{ textAlign: "right" }}>
          <T style={{ fontWeight: fw.sb }}>Annual Invested</T> (
          {(v.investedRate * 100).toFixed(0)}%)
        </T>
        <T style={{ textAlign: "right" }}>{toUsd(v.invested)}</T>
      </V>
    </V>
  );
}

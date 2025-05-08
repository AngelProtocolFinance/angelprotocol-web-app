import { toUsd } from "helpers/to-usd";
import type { Growth } from "../../types";
import { T, V } from "../components";
import { fs, fw, green, w } from "../styles";

interface Props extends Growth {
  yr: number;
}

export function ImpactCard(p: Props) {
  return (
    <V style={{ width: "33%" }}>
      <V style={{ backgroundColor: green.l5, padding: w["4"] }}>
        <T
          style={{
            textAlign: "right",
            fontWeight: fw.sb,
            fontSize: fs.sm2,
            marginBottom: w["2"],
          }}
        >
          {p.yr} {p.yr > 1 ? "Years" : "Year"} Impact
        </T>
        <T
          style={{
            textAlign: "right",
            fontWeight: fw.b,
            color: green.d,
            fontSize: fs.base,
          }}
        >
          {toUsd(p.total)}
        </T>
      </V>

      <T
        style={{
          fontWeight: fw.sb,
          textAlign: "right",
          fontSize: fs.base,
          marginTop: w["6"],
          paddingRight: w["4"],
        }}
      >
        Savings Account (4%)
      </T>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: fs.base,
          display: "flex",
          flexDirection: "row",
          marginTop: w["2"],
          paddingRight: w["4"],
        }}
      >
        <T style={{ marginRight: w["2"] }}>Invested:</T>
        <T>{toUsd(p.liq)}</T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: fs.base,
          display: "flex",
          flexDirection: "row",
          marginTop: w["2"],
          paddingRight: w["4"],
        }}
      >
        <T style={{ marginRight: w["2"] }}>Growth:</T>
        <T style={{ color: green.d, fontWeight: fw.sb }}>
          {toUsd(p.end.liq - p.liq)}
        </T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: fs.base,
          display: "flex",
          flexDirection: "row",
          marginTop: w["2"],
          paddingRight: w["4"],
        }}
      >
        <T style={{ marginRight: w["2"] }}>Balance:</T>
        <T>{toUsd(p.end.liq)}</T>
      </V>

      <T
        style={{
          fontWeight: fw.sb,
          textAlign: "right",
          fontSize: fs.base,
          marginTop: w["6"],
          paddingRight: w["4"],
        }}
      >
        Investment Account (20%)
      </T>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: fs.base,
          display: "flex",
          flexDirection: "row",
          marginTop: w["2"],
          paddingRight: w["4"],
        }}
      >
        <T style={{ marginRight: w["2"] }}>Invested:</T>
        <T>{toUsd(p.lock)}</T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: fs.base,
          display: "flex",
          flexDirection: "row",
          marginTop: w["2"],
          paddingRight: w["4"],
        }}
      >
        <T style={{ marginRight: w["2"] }}>Growth:</T>
        <T style={{ color: green.d, fontWeight: fw.sb }}>
          {toUsd(p.end.lock - p.lock)}
        </T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: fs.base,
          display: "flex",
          flexDirection: "row",
          marginTop: w["2"],
          paddingRight: w["4"],
        }}
      >
        <T style={{ marginRight: w["2"] }}>Balance:</T>
        <T>{toUsd(p.end.lock)}</T>
      </V>

      <V
        style={{
          justifyContent: "flex-end",
          fontSize: fs.base,
          display: "flex",
          flexDirection: "row",
          marginTop: w["2"],
          paddingRight: w["4"],
        }}
      >
        <T style={{ marginRight: w["2"] }}>Total Growth:</T>
        <T style={{ color: green.d, fontWeight: fw.b }}>{toUsd(p.total)}</T>
      </V>

      <V
        style={{
          backgroundColor: green.l5,
          padding: w["4"],
          marginTop: w["10"],
        }}
      >
        <T
          style={{
            textAlign: "right",
            fontWeight: fw.sb,
            fontSize: fs.sm2,
            marginBottom: w["2"],
          }}
        >
          {p.yr} {p.yr > 1 ? "Years" : "Year"} Balance
        </T>
        <T
          style={{
            textAlign: "right",
            fontWeight: fw.b,
            color: green.d,
            fontSize: fs.base,
          }}
        >
          {toUsd(p.end.total)}
        </T>
      </V>
    </V>
  );
}

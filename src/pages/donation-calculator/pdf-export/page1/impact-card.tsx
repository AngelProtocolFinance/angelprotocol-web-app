import { toUsd } from "helpers/to-usd";
import type { Growth } from "../../types";
import { T, V } from "../components";

interface Props extends Growth {
  yr: number;
}

export function ImpactCard(p: Props) {
  return (
    <V style={{ width: "33%" }}>
      <V style={{ backgroundColor: "#ecfdf5", padding: 4 }}>
        <T
          style={{
            textAlign: "right",
            fontWeight: 600,
            fontSize: 9.5,
            marginBottom: 2,
          }}
        >
          {p.yr} {p.yr > 1 ? "Years" : "Year"} Savings & Investment Impact
        </T>
        <T
          style={{
            textAlign: "right",
            fontWeight: 700,
            color: "#10b981",
            fontSize: 10,
          }}
        >
          {toUsd(p.total)}
        </T>
      </V>

      <T
        style={{
          fontWeight: 600,
          textAlign: "right",
          fontSize: 9,
          marginTop: 4,
          paddingRight: 4,
        }}
      >
        Savings Account (4%)
      </T>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: 9,
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingRight: 4,
        }}
      >
        <T style={{ marginRight: 2 }}>Invested:</T>
        <T>{toUsd(p.liq)}</T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: 9,
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingRight: 4,
        }}
      >
        <T style={{ marginRight: 2 }}>Growth:</T>
        <T>{toUsd(p.end.liq - p.liq)}</T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: 9,
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingRight: 4,
        }}
      >
        <T style={{ marginRight: 2 }}>Balance:</T>
        <T>{toUsd(p.end.liq)}</T>
      </V>

      <T
        style={{
          fontWeight: 600,
          textAlign: "right",
          fontSize: 9,
          marginTop: 4,
          paddingRight: 4,
        }}
      >
        Investment Account (20%)
      </T>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: 9,
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingRight: 4,
        }}
      >
        <T style={{ marginRight: 2 }}>Invested:</T>
        <T>{toUsd(p.lock)}</T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: 9,
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingRight: 4,
        }}
      >
        <T style={{ marginRight: 2 }}>Growth:</T>
        <T style={{ color: "#10b981", fontWeight: 600 }}>
          {toUsd(p.end.lock - p.lock)}
        </T>
      </V>
      <V
        style={{
          justifyContent: "flex-end",
          fontSize: 9,
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingRight: 4,
        }}
      >
        <T style={{ marginRight: 2 }}>Balance:</T>
        <T>{toUsd(p.end.lock)}</T>
      </V>

      <V
        style={{
          justifyContent: "flex-end",
          fontSize: 9,
          display: "flex",
          flexDirection: "row",
          marginTop: 2,
          paddingRight: 4,
        }}
      >
        <T style={{ marginRight: 2 }}>Total Growth:</T>
        <T style={{ color: "#10b981", fontWeight: 600 }}>{toUsd(p.total)}</T>
      </V>

      <V style={{ backgroundColor: "#ecfdf5", padding: 4, marginTop: 10 }}>
        <T
          style={{
            textAlign: "right",
            fontWeight: 600,
            fontSize: 9.5,
            marginBottom: 2,
          }}
        >
          {p.yr} {p.yr > 1 ? "Years" : "Year"} Balance
        </T>
        <T
          style={{
            textAlign: "right",
            fontWeight: 700,
            color: "#10b981",
            fontSize: 10,
          }}
        >
          {toUsd(p.end.total)}
        </T>
      </V>
    </V>
  );
}

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
        }}
      >
        <T style={{ marginRight: 2 }}>Invested:</T>
        <T>{toUsd(p.liq)}</T>
      </V>
      <p className="text-right px-2">
        <span className="mr-2">Growth:</span>
        <span>{toUsd(p.end.liq - p.liq)}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Balance:</span>
        <span>{toUsd(p.end.liq)}</span>
      </p>

      <p className="font-semibold text-right mt-6 px-2">
        Investment Account (20%)
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Invested:</span>
        <span>{toUsd(p.lock)}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Growth:</span>
        <span className="text-green">{toUsd(p.end.lock - p.lock)}</span>
      </p>
      <p className="text-right px-2">
        <span className="mr-2">Balance:</span>
        <span>{toUsd(p.end.lock)}</span>
      </p>

      <p className="text-right px-2">
        <span className="mr-2">Total Growth:</span>
        <span className="text-green">{toUsd(p.total)}</span>
      </p>

      <V style={{ backgroundColor: "#ecfdf5", padding: 4, marginTop: 24 }}>
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

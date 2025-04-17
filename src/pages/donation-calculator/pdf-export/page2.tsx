import type { View } from "../types";
import { Chart, Pg, T, V } from "./components";
import { fs, blue, fw, w } from "./styles";

const row1 = [
  {
    key: 5,
    label: "Short-Term Impact ( 5-Year View )",
  },
  {
    key: 10,
    label: "Momentum Building ( 10-Year View )",
  },
];
const row2 = [
  {
    key: 15,
    label: "Strategic Growth Horizon ( 15-Year View )",
  },
  {
    key: 20,
    label: "Long-Term Transformation ( 20-Year View )",
  },
];

export function Page2({ v }: { v: View }) {
  return (
    <Pg>
      <V
        style={{
          padding: w["10"],
          paddingBottom: 0,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <T
          style={{
            color: blue,
            fontWeight: fw.sb,
            fontSize: fs.xl - 4,
            textTransform: "uppercase",
          }}
        >
          Total 5 - 10 - 15 - 20 years financial advantage
        </T>
        <V style={{ height: w["2"], backgroundColor: blue, width: 175 }} />
      </V>
      <T
        style={{
          paddingHorizontal: w["10"],
          color: blue,
          fontWeight: fw.sb,
          fontSize: fs.xl - 4,
          textTransform: "uppercase",
        }}
      >
        (Estimated Predictions)
      </T>
      <T
        style={{
          fontWeight: fw.b,
          paddingHorizontal: w["10"],
          fontSize: fs.lg,
          marginTop: w["6"],
          marginBottom: w["6"],
        }}
      >
        Compound Growth = Exponential Impact
      </T>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: w["10"],
          gap: w["10"],
        }}
      >
        {row1.map((row) => {
          const data = v.projection.slice(0, row.key).map((x, i) => {
            const y = i + 1;
            return {
              year: y.toString(),
              amount: v.amount,
              liq: x.liq,
              savings: v.advantage * y,
              lock: x.lock,
              total: v.advantage * y + x.total,
            };
          });

          return (
            <V key={row.key} style={{ width: "50%" }}>
              <T style={{ fontSize: fs.base }}>{row.label}</T>
              {/* <Splits
                classes="justify-self-end"
                notGranted={v.notGranted}
                savings={v.savings}
                savingsRate={v.savingsRate}
                invested={v.invested}
                investedRate={v.investedRate}
              /> */}

              <Chart points={data} width={310} height={260} />
            </V>
          );
        })}
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          paddingHorizontal: w["10"],
          gap: w["10"],
        }}
      >
        {row2.map((row) => {
          const data = v.projection.slice(0, row.key).map((x, i) => {
            const y = i + 1;
            return {
              year: y.toString(),
              amount: v.amount,
              liq: x.liq,
              savings: v.advantage * y,
              lock: x.lock,
              total: v.advantage * y + x.total,
            };
          });

          return (
            <V key={row.key} style={{ width: "50%" }}>
              <T style={{ fontSize: fs.base }}>{row.label}</T>
              {/* <Splits
                classes="justify-self-end"
                notGranted={v.notGranted}
                savings={v.savings}
                savingsRate={v.savingsRate}
                invested={v.invested}
                investedRate={v.investedRate}
              /> */}

              <Chart points={data} width={310} height={260} />
            </V>
          );
        })}
      </V>
    </Pg>
  );
}

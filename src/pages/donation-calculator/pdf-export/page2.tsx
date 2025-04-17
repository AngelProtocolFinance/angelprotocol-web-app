import type { View } from "../types";
import { Chart, Pg, T, V } from "./components";
import { Splits } from "./splits";
import { fs, blue, fw, green, w } from "./styles";

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
            color: blue.d,
            fontWeight: fw.sb,
            fontSize: fs.xl - 4,
            textTransform: "uppercase",
          }}
        >
          Total 5 - 10 - 15 - 20 years financial advantage
        </T>
        <V style={{ height: w["2"], backgroundColor: blue.d, width: 175 }} />
      </V>
      <T
        style={{
          paddingHorizontal: w["10"],
          color: blue.d,
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
          marginVertical: w["14"],
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
            <V key={row.key} style={{ width: "50%", display: "flex" }}>
              <T style={{ fontSize: fs.base, marginLeft: w["6"] + 2 }}>
                {row.label}
              </T>
              <Splits
                notGranted={v.notGranted}
                savings={v.savings}
                savingsRate={v.savingsRate}
                invested={v.invested}
                investedRate={v.investedRate}
              />

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
              <T style={{ fontSize: fs.base, marginLeft: w["6"] + 2 }}>
                {row.label}
              </T>
              <Splits
                notGranted={v.notGranted}
                savings={v.savings}
                savingsRate={v.savingsRate}
                invested={v.invested}
                investedRate={v.investedRate}
              />

              <Chart points={data} width={310} height={260} />
            </V>
          );
        })}
      </V>
      <V
        style={{
          fontSize: fs.sm,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingHorizontal: w["10"],
          marginTop: w["6"],
          gap: w["10"],
        }}
      >
        <V
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: w["2"],
          }}
        >
          <V
            style={{
              width: w["6"],
              height: w["6"],
              borderRadius: 999,
              backgroundColor: green.l1,
              borderWidth: 1,
              borderColor: green.d1,
            }}
          />
          <T style={{ color: green.d1 }}>Donation Processing Savings</T>
        </V>
        <V
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: w["2"],
          }}
        >
          <V
            style={{
              width: w["6"],
              height: w["6"],
              borderRadius: 999,
              backgroundColor: "#FFCA70",
              borderWidth: 1,
              borderColor: "#D89F36",
            }}
          />
          <T style={{ color: "#FFCA70" }}>Savings Returns</T>
        </V>
        <V
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: w["2"],
          }}
        >
          <V
            style={{
              width: w["6"],
              height: w["6"],
              borderRadius: 999,
              backgroundColor: blue.l1,
              borderWidth: 1,
              borderColor: blue.d,
            }}
          />
          <T style={{ color: blue.l1 }}>Investment Returns</T>
        </V>
        <V
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: w["2"],
          }}
        >
          <V
            style={{
              width: w["6"],
              height: w["6"],
              borderRadius: 999,
              backgroundColor: blue.d,
            }}
          />
          <T style={{ color: blue.d }}>Total Financial Advantage</T>
        </V>
      </V>
      <V
        style={{
          marginTop: w["6"],
          color: "#4F5C68",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: w["6"],
        }}
      >
        {/* You'll need to import or create an Info icon component for react-pdf */}
        {/* Info icon component */}
        <V
          style={{
            width: 16,
            height: 16,
            marginRight: w["2"],
            color: "#D89F36",
          }}
        />
        <T>
          Investment yields based on average annual returns over past 5 years
          (4% for Savings Account, 20% for Sustainability Fund)
        </T>
      </V>
    </Pg>
  );
}

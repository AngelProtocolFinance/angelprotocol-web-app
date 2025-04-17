import bg from "assets/images/bettergiving-logo-white.png";
import { BASE_URL } from "constants/env";
import { format } from "date-fns";
import { toUsd } from "helpers/to-usd";
import { methodsArr } from "types/donation-calculator";
import type { View as TView } from "../../types";
import { A, Img, Pg, T, V } from "../components";
import { fs, blue, fw, styles, w } from "../styles";
import { Usd } from "../usd";
import { DonationMethods } from "./donation-methods";
import { ImpactCard } from "./impact-card";

interface Props {
  v: TView;
}

export function Page1({ v }: Props) {
  return (
    <Pg
      size="A4"
      style={{
        display: "flex",
        alignContent: "flex-start",
        flexDirection: "column",
      }}
    >
      <V
        style={{
          ...styles.header,
          padding: w["10"],
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <V style={{ width: "70%" }}>
          <T
            wrap
            style={{
              textTransform: "uppercase",
              fontWeight: fw.b,
              fontSize: fs.xl,
            }}
          >
            Your Nonprofit’s Financial
          </T>
          <T
            style={{
              textTransform: "uppercase",
              fontWeight: fw.b,
              fontSize: fs.xl,
            }}
          >
            Advantage with Better giving
          </T>
          <T style={{ fontSize: fs.lg, marginTop: w["4"], fontWeight: fw.n }}>
            Donation Processing & Investment Impact Calculator
          </T>
          <T style={{ fontSize: fs.base }}>
            Generated on {format(new Date(), "PP")}
          </T>
        </V>
        <A href={BASE_URL}>
          <Img src={bg} style={{ width: 120 }} />
        </A>
      </V>
      <V
        style={{
          padding: w["10"],
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
            fontSize: fs.lg,
            textTransform: "uppercase",
          }}
        >
          Your current online donations
        </T>
        <V style={{ height: w["2"], backgroundColor: blue, width: 322 }} />
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: w["14"],
          gap: w["20"],
          marginTop: -w["20"] - 2,
        }}
      >
        <V style={{ width: "50%", display: "flex", gap: w["4"] }}>
          <V style={styles.kv}>
            <T style={{ fontSize: fs.base }}>Annual Online Donations</T>
            <T style={{ fontSize: fs.sm, fontWeight: fw.sb }}>
              {toUsd(v.amount)}
            </T>
          </V>
          <V style={styles.kv}>
            <T style={{ fontSize: fs.base }}>Avg. Processing Fees</T>
            <T style={{ fontSize: fs.sm, fontWeight: fw.sb }}>
              {(v.ogProcessingFeeRate * 100).toFixed(2)}%
            </T>
          </V>
        </V>
        <V style={{ width: "50%", display: "flex", gap: w["4"] }}>
          <V style={styles.kv}>
            <T style={{ fontSize: fs.base }}>Platform Fees</T>
            <T style={{ fontSize: fs.sm, fontWeight: fw.sb }}>
              {(v.ogPlatformFeeRate * 100).toFixed(2)}%
            </T>
          </V>
          <V style={styles.kv}>
            <T style={{ fontSize: fs.base }}>Annual Platform Subscription</T>
            <T style={{ fontSize: fs.sm, fontWeight: fw.sb }}>
              {toUsd(v.ogSubsCost)}
            </T>
          </V>
        </V>
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: w["14"],
          gap: w["10"],
          marginTop: -w["20"] - 2,
        }}
      >
        <T style={{ fontSize: fs.base }}>Accepted Donation Types</T>
        <DonationMethods activeMethods={v.ogDonMethods} />
      </V>
      <V
        style={{
          marginTop: -w["4"],
          padding: w["10"],
          marginHorizontal: w["20"],
          backgroundColor: "#f1f5f9",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <V>
          <T style={{ fontSize: fs.base }}>Current Amount Received</T>
          <V
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: w["4"],
              marginTop: w["2"],
              fontWeight: fw.b,
            }}
          >
            <Usd relative={v.amount}>{v.ogNet}</Usd>{" "}
            <Usd parens>{-v.ogDeductions}</Usd>
          </V>
        </V>
      </V>
      <V
        style={{
          padding: w["10"],
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
            fontSize: fs.lg,
            textTransform: "uppercase",
          }}
        >
          Annual Donation Processing Impact With Better Giving
        </T>
        <V style={{ height: 2, backgroundColor: blue, width: 145 }} />
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: w["14"],
          gap: w["20"],
          marginTop: -w["20"],
        }}
      >
        <V style={{ width: "50%", display: "flex", gap: w["4"] }}>
          <V style={styles.kv}>
            <T style={{ fontSize: fs.base }}>Fee Savings</T>
            <T style={{ fontSize: fs.sm, fontWeight: fw.sb }}>
              <Usd sign>{v.feeSavings}</Usd>
            </T>
          </V>
          <V style={styles.kv}>
            <T style={{ fontSize: fs.base }}>
              Added Donations from New Payment Types
            </T>
            <T style={{ fontSize: fs.sm, fontWeight: fw.sb }}>
              <Usd sign>{v.ogMissedFromDonTypes}</Usd>
            </T>
          </V>
        </V>
        <V style={{ width: "50%", display: "flex", gap: w["4"] }}>
          <V style={styles.kv}>
            <T style={{ fontSize: fs.base }}>Platform Subscription Savings</T>
            <V style={{ fontSize: fs.sm, fontWeight: fw.sb }}>
              <Usd sign>{v.ogSubsCost}</Usd>
            </V>
          </V>
        </V>
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: w["14"],
          gap: w["10"],
          marginTop: -w["20"] - 2,
        }}
      >
        <T style={{ fontSize: fs.base }}>Accepted Donation Types</T>
        <DonationMethods activeMethods={methodsArr} />
      </V>
      <V
        style={{
          marginTop: -w["4"],
          padding: w["10"],
          marginHorizontal: w["14"],
          backgroundColor: "#f1f5f9",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <V>
          <T style={{ fontSize: fs.base, fontWeight: fw.sb }}>
            With Better Giving
          </T>
          <V
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: w["4"],
              marginTop: w["2"],
              fontWeight: fw.b,
            }}
          >
            <Usd relative={v.ogNet}>{v.bgNet}</Usd>{" "}
            <Usd sign parens>
              {v.advantage}
            </Usd>
          </V>
        </V>
      </V>
      <V
        style={{
          padding: w["10"],
          marginHorizontal: w["20"],
          backgroundColor: "#ecfdf5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <T style={{ fontSize: fs.base, textAlign: "center" }}>
          Total annual advantage
        </T>
        <V style={{ fontWeight: fw.b }}>
          <Usd sign>{v.advantage}</Usd>s
        </V>
      </V>
      <V
        style={{
          padding: w["10"],
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
            fontSize: fs.lg,
            textTransform: "uppercase",
          }}
        >
          LONG-TERM FINANCIAL GROWTH (ESTIMATED PREDICTIONS)
        </T>
        <V style={{ height: w["2"], backgroundColor: blue, width: 165 }} />
      </V>
      <T
        style={{
          paddingHorizontal: w["10"],
          fontSize: fs.base,
          marginTop: -w["10"] + 2,
          fontWeight: fw.sb,
        }}
      >
        How Strategic Saving and Allocation Through Better Giving Could Grow
        Your Nonprofit's Resources
      </T>

      <V
        style={{
          fontSize: fs.base,
          paddingHorizontal: w["20"],
          marginTop: w["4"],
        }}
      >
        <T>
          <T>Savings & Investment Allocation:</T>
          <T style={{ fontWeight: fw.sb }}> 10%</T> of Annual Donations
          Allocated to Savings/Investments
        </T>
        <T style={{ fontSize: fs.sm - 1 }}>
          ({toUsd(v.amount)}{" "}
          <T style={{ fontWeight: fw.sb }}>with Better Giving</T> ×{" "}
          {(v.notGrantedRate * 100).toFixed(2)}% = {toUsd(v.notGranted)})
        </T>

        <T style={{ marginTop: w["6"], marginBottom: w["2"] }}>
          Allocation Between Accounts:
        </T>
        <V style={{ paddingHorizontal: w["2"], fontSize: fs.base }}>
          <T>
            &#8226;{" "}
            <T style={{ fontWeight: fw.sb }}>
              {(v.savingsRate * 100).toFixed(2)}%
            </T>{" "}
            to High-Yield Savings Account (4% Annual Yield)
          </T>
          <T>
            &#8226;{" "}
            <T style={{ fontWeight: fw.sb }}>
              {(v.investedRate * 100).toFixed(2)}%
            </T>{" "}
            to Sustainability Fund (20% Average Annual Return)
          </T>
        </V>
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: w["14"],
        }}
      >
        <ImpactCard yr={1} {...v.projection[0]} />
        <ImpactCard yr={5} {...v.projection[4]} />
        <ImpactCard yr={10} {...v.projection[9]} />
      </V>
    </Pg>
  );
}

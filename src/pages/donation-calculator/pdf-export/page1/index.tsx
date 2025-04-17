import bg from "assets/images/bettergiving-logo-white.png";
import Image from "components/image";
import { BASE_URL } from "constants/env";
import { format } from "date-fns";
import { toUsd } from "helpers/to-usd";
import { methodsArr } from "types/donation-calculator";
import type { View as TView } from "../../types";
import { A, Img, Pg, T, V } from "../components";
import { blue, pd, styles } from "../styles";
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
          padding: pd.l2,
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
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Your Nonprofit’s Financial
          </T>
          <T
            style={{
              textTransform: "uppercase",
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            Advantage with Better giving
          </T>
          <T style={{ fontSize: 14, marginTop: 4 }}>
            Donation Processing & Investment Impact Calculator
          </T>
          <T style={{ fontSize: 10 }}>
            Generated on {format(new Date(), "PP")}
          </T>
        </V>
        <A href={BASE_URL}>
          <Img src={bg} style={{ width: 120 }} />
        </A>
      </V>
      <V
        style={{
          padding: pd.l2,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <T
          style={{
            color: blue,
            fontWeight: 600,
            fontSize: 15,
            textTransform: "uppercase",
          }}
        >
          Your current online donations
        </T>
        <V style={{ height: 2, backgroundColor: blue, width: 295 }} />
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: pd.l3,
          gap: 20,
          marginTop: -20,
        }}
      >
        <V style={{ width: "50%", display: "flex", gap: 4 }}>
          <V style={styles.kv}>
            <T style={{ fontSize: 10 }}>Annual Online Donations</T>
            <T style={{ fontSize: 9, fontWeight: 600 }}>{toUsd(v.amount)}</T>
          </V>
          <V style={styles.kv}>
            <T style={{ fontSize: 10 }}>Avg. Processing Fees</T>
            <T style={{ fontSize: 9, fontWeight: 600 }}>
              {(v.ogProcessingFeeRate * 100).toFixed(2)}%
            </T>
          </V>
        </V>
        <V style={{ width: "50%", display: "flex", gap: 4 }}>
          <V style={styles.kv}>
            <T style={{ fontSize: 10 }}>Platform Fees</T>
            <T style={{ fontSize: 9, fontWeight: 600 }}>
              {(v.ogPlatformFeeRate * 100).toFixed(2)}%
            </T>
          </V>
          <V style={styles.kv}>
            <T style={{ fontSize: 10 }}>Annual Platform Subscription</T>
            <T style={{ fontSize: 9, fontWeight: 600 }}>
              {toUsd(v.ogSubsCost)}
            </T>
          </V>
        </V>
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: pd.l3,
          gap: 10,
          marginTop: -35,
        }}
      >
        <T style={{ fontSize: 10 }}>Accepted Donation Types</T>
        <DonationMethods activeMethods={v.ogDonMethods} />
      </V>
      <V
        style={{
          marginTop: -5,
          padding: pd.l1,
          marginHorizontal: 20,
          backgroundColor: "#f1f5f9",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <V>
          <T style={{ fontSize: 10 }}>Current Amount Received</T>
          <V
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 4,
              marginTop: 2,
              fontWeight: 700,
            }}
          >
            <Usd relative={v.amount}>{v.ogNet}</Usd>{" "}
            <Usd parens>{-v.ogDeductions}</Usd>
          </V>
        </V>
      </V>
      <V
        style={{
          padding: 14,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <T
          style={{
            color: blue,
            fontWeight: 600,
            fontSize: 15,
            textTransform: "uppercase",
          }}
        >
          Annual Donation Processing Impact With Better Giving
        </T>
        <V style={{ height: 2, backgroundColor: blue, width: 110 }} />
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: pd.l3,
          gap: 20,
          marginTop: -20,
        }}
      >
        <V style={{ width: "50%", display: "flex", gap: 4 }}>
          <V style={styles.kv}>
            <T style={{ fontSize: 10 }}>Fee Savings</T>
            <T style={{ fontSize: 9, fontWeight: 600 }}>
              <Usd sign>{v.feeSavings}</Usd>
            </T>
          </V>
          <V style={styles.kv}>
            <T style={{ fontSize: 10 }}>
              Added Donations from New Payment Types
            </T>
            <T style={{ fontSize: 9, fontWeight: 600 }}>
              <Usd sign>{v.ogMissedFromDonTypes}</Usd>
            </T>
          </V>
        </V>
        <V style={{ width: "50%", display: "flex", gap: 4 }}>
          <V style={styles.kv}>
            <T style={{ fontSize: 10 }}>Platform Subscription Savings</T>
            <V style={{ fontSize: 9, fontWeight: 600 }}>
              <Usd sign>{v.ogSubsCost}</Usd>
            </V>
          </V>
        </V>
      </V>
      <V
        style={{
          display: "flex",
          flexDirection: "row",
          padding: pd.l3,
          gap: 10,
          marginTop: -35,
        }}
      >
        <T style={{ fontSize: 10 }}>Accepted Donation Types</T>
        <DonationMethods activeMethods={methodsArr} />
      </V>
      <V
        style={{
          marginTop: -5,
          padding: pd.l1,
          marginHorizontal: pd.l3,
          backgroundColor: "#f1f5f9",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <V>
          <T style={{ fontSize: 10, fontWeight: 600 }}>With Better Giving</T>
          <V
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 4,
              marginTop: 2,
              fontWeight: 700,
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
          padding: pd.l1,
          marginHorizontal: 20,
          backgroundColor: "#ecfdf5",
          display: "flex",
          alignItems: "center",
        }}
      >
        <T style={{ fontSize: 11, textAlign: "center" }}>
          Total annual advantage
        </T>
        <V style={{ fontWeight: 700 }}>
          <Usd sign>{v.advantage}</Usd>s
        </V>
      </V>
      <V
        style={{
          padding: 14,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <T
          style={{
            color: blue,
            fontWeight: 600,
            fontSize: 15,
            textTransform: "uppercase",
          }}
        >
          LONG-TERM FINANCIAL GROWTH (ESTIMATED PREDICTIONS)
        </T>
        <V style={{ height: 2, backgroundColor: blue, width: 125 }} />
      </V>
      <T
        style={{
          paddingHorizontal: pd.l2,
          fontSize: 11,
          marginTop: -10,
          fontWeight: 600,
        }}
      >
        How Strategic Saving and Allocation Through Better Giving Could Grow
        Your Nonprofit's Resources
      </T>

      <V style={{ fontSize: 11, paddingHorizontal: pd.l4, marginTop: 4 }}>
        <T>
          <T>Savings & Investment Allocation:</T>
          <T style={{ fontWeight: 600 }}> 10%</T> of Annual Donations Allocated
          to Savings/Investments
        </T>
        <T style={{ fontSize: 9 }}>
          ({toUsd(v.amount)}{" "}
          <T style={{ fontWeight: 600 }}>with Better Giving</T> ×{" "}
          {(v.notGrantedRate * 100).toFixed(2)}% = {toUsd(v.notGranted)})
        </T>

        <T style={{ marginTop: 3, marginBottom: 2 }}>
          Allocation Between Accounts:
        </T>
        <V style={{ paddingHorizontal: 2, fontSize: 10 }}>
          <T>
            &#8226;{" "}
            <T style={{ fontWeight: 600 }}>
              {(v.savingsRate * 100).toFixed(2)}%
            </T>{" "}
            to High-Yield Savings Account (4% Annual Yield)
          </T>
          <T>
            &#8226;{" "}
            <T style={{ fontWeight: 600 }}>
              {(v.investedRate * 100).toFixed(2)}%
            </T>{" "}
            to Sustainability Fund (20% Average Annual Return)
          </T>
        </V>
      </V>

      <V style={{ display: "flex", flexDirection: "row", padding: pd.l3 }}>
        <ImpactCard yr={1} {...v.projection[0]} />
        <ImpactCard yr={5} {...v.projection[4]} />
        <ImpactCard yr={10} {...v.projection[9]} />
      </V>
    </Pg>
  );
}

export function PageOne({ v }: Props) {
  return (
    <div className="w-full">
      <div className="bg-blue p-6">
        <div className="grid grid-cols-[1fr_auto] items-center">
          <div>
            <h1 className="text-white text-4xl font-bold">
              YOUR NONPROFIT'S FINANCIAL
              <br />
              ADVANTAGE WITH BETTER GIVING
            </h1>
            <p className="text-white text-lg mt-2">
              Donation Processing & Investment Impact Calculator
            </p>
            <p className="text-white">
              Generated on {format(new Date(), "PP")}
            </p>
          </div>
          <Image
            src={bg}
            alt="Better Giving Logo"
            width={280}
            height={95.8}
            className="object-contain self-start relative top-4"
          />
        </div>
      </div>

      <section className="mt-8">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
          <h2 className="text-blue text-2xl font-semibold">
            YOUR CURRENT ONLINE DONATIONS
          </h2>
          <div className="h-0.5 bg-blue" />
        </div>

        <div className="grid grid-cols-2 content-start gap-x-4 px-8 mt-6">
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Annual Online Donations</span>
            <span className="font-semibold">{toUsd(v.amount)}</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Avg. Processing Fees</span>
            <span className="font-semibold">
              {(v.ogProcessingFeeRate * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Platform Fees</span>
            <span className="font-semibold">
              {(v.ogPlatformFeeRate * 100).toFixed(2)}%
            </span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Annual Platform Subscription</span>
            <span className="font-semibold">{toUsd(v.ogSubsCost)}</span>
          </div>
          <div className="col-span-full flex items-center gap-x-4 font-heading text-lg">
            <span className="text-gray-d1 mr-8">Accepted Donation Types</span>
            <DonationMethods activeMethods={v.ogDonMethods} />
          </div>
        </div>

        <div className="mt-12 text-right mx-8 p-6 bg-gray-l4 font-heading">
          <p className="text-gray-d1 text-lg">Current Amount Received</p>
          <div className="text-2xl font-semibold">
            <Usd relative={v.amount}>{v.ogNet}</Usd>{" "}
            <Usd parens classes="text-lg sm:text-xl">
              {-v.ogDeductions}
            </Usd>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
          <h2 className="text-blue text-2xl font-semibold">
            ANNUAL DONATION PROCESSING IMPACT WITH BETTER GIVING
          </h2>
          <div className="h-0.5 bg-blue" />
        </div>

        <div className="grid grid-cols-2 content-start gap-x-4 px-8 mt-6">
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Fee Savings</span>
            <span className="font-semibold text-green">+$2,900</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">
              Added Donations from New Payment Types
            </span>
            <span className="font-semibold text-green">+$18,500</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Platform Subscription Savings</span>
            <span className="font-semibold text-green">+$1,200</span>
          </div>
          <div className="flex font-heading justify-between mb-4 text-lg">
            <span className="text-gray-d1">Donor-Fee Coverage</span>
            <span className="font-semibold text-green">+$1,600</span>
          </div>
          <div className="col-span-full flex items-center gap-x-4 font-heading text-lg">
            <span className="text-gray-d1 mr-8">Accepted Donation Types</span>
            <DonationMethods activeMethods={methodsArr} />
          </div>
        </div>

        <div className="mt-12 text-right mx-8 p-6 bg-gray-l4 font-heading">
          <p className="text-gray-d1 text-lg">With Better Giving</p>
          <p className="text-2xl font-semibold ">
            <Usd relative={v.ogNet}>{v.bgNet}</Usd>{" "}
            <Usd sign parens classes="text-lg sm:text-xl">
              {v.advantage}
            </Usd>
          </p>
        </div>
        <div className="text-right mx-8 p-6 bg-green-l5 font-heading">
          <p className="text-gray-d1 text-lg text-center">
            Total annual advantage
          </p>
          <Usd sign classes="text-2xl block text-center font-semibold">
            {v.advantage}
          </Usd>
        </div>
      </section>

      <section className="mt-12">
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center px-6">
          <h2 className="text-blue text-2xl font-semibold">
            LONG-TERM FINANCIAL GROWTH (ESTIMATED PREDICTIONS)
          </h2>
          <div className="h-0.5 bg-blue" />
        </div>
        <p className="text-gray-d1 mt-2 mb-4 px-6 text-lg font-semibold">
          How Strategic Saving and Allocation Through Better Giving Could Grow
          Your Nonprofit's Resources
        </p>

        <div className="mb-6 px-8">
          <p className="mb-2">
            <span className="text-gray-d1 text-lg">
              Savings & Investment Allocation:
            </span>
            <span className="font-semibold"> 10%</span> of Annual Donations
            Allocated to Savings/Investments
          </p>
          <p className="text-sm text-gray">
            ({toUsd(v.amount)} with Better Giving ×{" "}
            {(v.notGrantedRate * 100).toFixed(2)}% = {toUsd(v.notGranted)})
          </p>

          <p className="mt-4 mb-2">Allocation Between Accounts:</p>
          <ul className="list-disc pl-8">
            <li className="mb-2">
              <span className="font-semibold">
                {(v.savingsRate * 100).toFixed(2)}%
              </span>{" "}
              to High-Yield Savings Account (4% Annual Yield)
            </li>
            <li>
              <span className="font-semibold">
                {(v.investedRate * 100).toFixed(2)}%
              </span>{" "}
              to Sustainability Fund (20% Average Annual Return)
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-3 mt-8 px-8">
          <ImpactCard
            title="1 Year Savings & Investment Impact"
            {...v.projection[0]}
          />
          <ImpactCard
            title="5 Years Savings & Investment Impact"
            {...v.projection[4]}
          />
          <ImpactCard
            title="10 Years Savings & Investment Impact"
            {...v.projection[9]}
          />
        </div>
      </section>
    </div>
  );
}

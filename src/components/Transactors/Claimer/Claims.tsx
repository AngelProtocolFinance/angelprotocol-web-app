import { useMemo } from "react";
import { Dec } from "@terra-money/terra.js";
import { useGovStaker } from "services/terra/gov/queriers";
import toCurrency from "helpers/toCurrency";
import Icon from "components/Icons/Icons";

export default function Claims() {
  const staker = useGovStaker();

  const total_claims = useMemo(
    () =>
      staker.claims
        ?.filter((claim) => +claim.release_at.at_time <= +Date.now() * 1e6)
        .reduce((prev, curr) => prev.add(new Dec(curr.amount)), new Dec(0)) ||
      new Dec(0),
    [staker]
  );

  const amount = toCurrency(total_claims.div(1e6).toNumber(), 2, true);
  const hasClaim = (staker.claims || []).length > 0;

  return (
    <div
      className={`grid ${
        hasClaim ? "p-2 shadow-inner-white-grey bg-light-grey rounded-md" : ""
      }`}
    >
      {(hasClaim && (
        <ul className="flex flex-col mt-3 mb-2 mx-1">
          {(staker?.claims || []).map((claim, i) => (
            <Claim
              key={i}
              time={claim.release_at.at_time}
              amount={claim.amount}
            />
          ))}
        </ul>
      )) ||
        null}
      {total_claims.gt(0) && (
        <p className="uppercase mb-1.5 text-angel-blue">
          <span className="text-xs font-heading font-bold mr-1">
            {" "}
            Total claimable
          </span>
          <span className="font-heading">{amount} HALO</span>
        </p>
      )}
    </div>
  );
}

function Claim(props: { time: string; amount: string }) {
  const claimable = +props.time <= +Date.now() * 1e6;
  const claim_date = new Date(+props.time / 1e6).toLocaleString();
  const amount = new Dec(props.amount).div(1e6).toNumber();
  return (
    <li className="flex justify-between">
      <p
        className={`font-heading ${
          claimable ? "text-angel-blue" : "text-grey-accent"
        }`}
      >
        <span className="mr-1">{toCurrency(amount, 2, true)}</span>
        <span className="text-xs font-semibold">HALO</span>
      </p>
      <p className="text-xs font-semibold">
        {claimable ? (
          <span className="flex items-center text-angel-blue">
            <Icon type="Check" className="mr-0.5" /> claimable
          </span>
        ) : (
          <span className="flex items-center text-grey-accent">
            <Icon type="HourglassSplit" className="mr-0.5" />
            {claim_date}
          </span>
        )}
      </p>
    </li>
  );
}

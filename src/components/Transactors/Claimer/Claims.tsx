import { useMemo } from "react";
import { useGovStaker } from "services/terra/gov/queriers";
import Icon from "components/Icon";
import Decimal from "helpers/Decimal";
import toCurrency from "helpers/toCurrency";

const ZERO = new Decimal(0, 6);

export default function Claims() {
  const staker = useGovStaker();

  const total_claims = useMemo(
    () =>
      staker.claims
        ?.filter((claim) => +claim.release_at.at_time <= +Date.now() * 1e6)
        .reduce((prev, curr) => prev.plus(new Decimal(curr.amount, 6)), ZERO) ||
      ZERO,
    [staker]
  );

  const amount = toCurrency(total_claims.toNumber(), 2, true);
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
      {total_claims.isGreaterThan(ZERO) && (
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
  const amount = new Decimal(props.amount, 6).toNumber();
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

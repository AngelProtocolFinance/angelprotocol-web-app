import chains from "@better-giving/assets/chains";
import { logoUrl } from "constants/common";
import Image from "../../../../Image";
import { useDonationState } from "../../Context";
import Summary from "../../common/Summary";
import { token } from "../../common/Token";
import type { CryptoSubmitStep } from "../../types";
import { DonationTerms } from "../DonationTerms";
import DirectMode from "./DirectMode";

export default function Crypto(props: CryptoSubmitStep) {
  const { setState } = useDonationState();
  const { details, tip, feeAllowance } = props;
  const Amount = token(details.token.rate, details.token.precision);

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      onBack={() => setState({ ...props, step: "summary" })}
      Amount={Amount}
      amount={+details.token.amount}
      feeAllowance={feeAllowance}
      tip={
        tip
          ? {
              value: tip.value,
              charityName: props.init.recipient.name,
            }
          : undefined
      }
      preSplitContent={
        <>
          <dl className="text-navy-l1 py-3 flex items-center justify-between border-b border-gray-l4">
            <dt className="mr-auto">Currency</dt>
            <Image
              className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
              src={logoUrl(details.token.logo)}
            />
            <dd className="text-navy-d4">{details.token.symbol}</dd>
          </dl>
          <dl className="text-navy-l1 py-3 flex items-center justify-between">
            <dt className="mr-auto">Blockchain</dt>
            <dd className="text-navy-d4">
              {chains[details.token.network].name}
            </dd>
          </dl>
        </>
      }
      program={props.details.program}
    >
      <DirectMode donation={props} classes="mt-4" />
      <DonationTerms endowName={props.init.recipient.name} classes="mt-5" />
    </Summary>
  );
}

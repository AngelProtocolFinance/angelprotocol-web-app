import chains from "@better-giving/assets/chains";
import { is_custom } from "@better-giving/assets/tokens";
import { logo_url } from "constants/common";
import { Image } from "../../../../image";
import { Summary } from "../../common/summary";
import { token } from "../../common/token";
import { use_donation_state } from "../../context";
import type { CryptoSubmitStep } from "../../types";
import { DonationTerms } from "../donation-terms";
import { DirectMode } from "./direct-mode";

export function Crypto(props: CryptoSubmitStep) {
  const { set_state } = use_donation_state();
  const { details, tip, fee_allowance } = props;
  const Amount = token(details.token.rate, details.token.precision);

  return (
    <Summary
      classes="grid content-start p-4 @md/steps:p-8"
      on_back={() => set_state({ ...props, step: "summary" })}
      Amount={Amount}
      amount={+details.token.amount}
      fee_allowance={fee_allowance}
      tip={
        tip
          ? {
              value: tip.value,
              charity_name: props.init.recipient.name,
            }
          : undefined
      }
      pre_split_content={
        <>
          <dl className="text-gray py-3 flex items-center justify-between border-b border-gray-l3">
            <dt className="mr-auto">Currency</dt>
            <Image
              className="ml-auto object-cover h-4 w-4 rounded-full mr-1"
              src={logo_url(details.token.logo, is_custom(details.token.id))}
            />
            <dd className="text-gray-d4">{details.token.symbol}</dd>
          </dl>
          <dl className="text-gray py-3 flex items-center justify-between">
            <dt className="mr-auto">Blockchain</dt>
            <dd className="text-gray-d4">
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

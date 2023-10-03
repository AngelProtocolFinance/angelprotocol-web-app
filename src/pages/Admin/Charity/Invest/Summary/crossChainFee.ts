import Dec from "decimal.js";
import { AWSstrategy } from "types/aws";
import {
  AxelarGasEstimateResponse,
  AxelarGasFeeEstimationParams,
} from "types/axelar";
import { TokenWithAmount } from "types/tx";
import { axelarAPIurl } from "services/axelar";
import { scaleToStr } from "helpers";
import { contracts } from "constant/contracts";

type Fee = {
  scaled: string;
  amount: number;
};

export default async function crossChainFee(
  token: TokenWithAmount,
  { routerAxelarChainName, router }: AWSstrategy
): Promise<Fee | null> {
  try {
    //zero cross-chain fee for local investments
    if (routerAxelarChainName === "polygon") {
      return { amount: 0, scaled: "0" };
    }

    const payload: AxelarGasFeeEstimationParams = {
      method: "estimateGasFee",
      sourceChain: "Polygon",
      //TODO: getFrom strategy_key (currently incorrect)
      destinationChain: routerAxelarChainName,
      gasMultiplier: 1.5,
      showDetailedFees: true,

      sourceTokenSymbol: token.symbol,
      sourceTokenAddress: "0x2c852e740B62308c46DD29B982FBb650D063Bd07", //aUSDC

      sourceContractAddress: contracts["accounts"],
      //TODO: AWSstrategy must include this value
      destinationContractAddress: router,

      symbol: token.symbol,
      amount: +token.amount,
    };

    const res = await fetch(axelarAPIurl, {
      method: "POST",
      body: JSON.stringify(payload),
    }).then<AxelarGasEstimateResponse>((res) => res.json());

    const {
      base_fee,
      express_fee,

      //source
      source_base_fee,
      source_confirm_fee,
      source_express_fee,

      //destination
      destination_base_fee,
      destination_confirm_fee,
      destination_express_fee,

      /** tokens involved  */
      destination_native_token,
      axelar_token,
      source_token,

      //settings
      express_supported,
    } = res.apiResponse.result;

    const totalAxelarFee = new Dec(base_fee).add(
      express_supported ? 0 : express_fee
    );
    const totalDestinationFee = new Dec(destination_base_fee)
      .add(destination_confirm_fee)
      .add(express_supported ? 0 : destination_express_fee.total);

    const totalSourceFee = new Dec(source_base_fee)
      .add(source_confirm_fee)
      .add(express_supported ? 0 : source_express_fee.total);

    const totalDestinationFee_sourceDenom = totalDestinationFee.mul(
      //to source token denom
      destination_native_token.token_price.usd / source_token.token_price.usd
    );

    const totalAxelarFees_sourceDenom = totalAxelarFee.mul(
      axelar_token.token_price.usd / source_token.token_price.usd
    );

    const totalFee = totalSourceFee
      .add(totalDestinationFee_sourceDenom)
      .add(totalAxelarFees_sourceDenom);

    return {
      amount: totalFee.toNumber(),
      scaled: scaleToStr(totalFee, source_token.decimals),
    };
  } catch (err) {
    return null;
  }
}

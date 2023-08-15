import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { walletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

const contract = walletAddr(chainIds.polygon);

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,

  accountsContract: contract,
  charitySharesContract: contract,
  donationMatchCharitesContract: contract,
  fundraisingContract: contract,
  govContract: contract,
  haloTokenLpContract: contract,
  haloToken: contract,
  indexFundContract: contract,
  uniswapRouter: contract,
  charityApplications: contract,

  //wasm codes
  multisigFactory: contract,
  subdaoBondingTokenContract: contract,
  subdaoTokenContract: contract,
  subdaoCw900Contract: contract,
  subdaoDistributorContract: contract,
  subdaoGovContract: contract,
}) as ObjectSchema<FormValues>;

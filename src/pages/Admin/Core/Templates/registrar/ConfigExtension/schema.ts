import { chainIds } from "constant/chainIds";
import { ObjectSchema, object } from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { walletAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const contract = walletAddr(chainIds.polygon);

export const schema = object<any, SchemaShape<FormValues>>({
  ...proposalShape,
  accountsContract: contract,
  apTeamMultisig: contract,
  treasury: contract,
  indexFundContract: contract,
  haloToken: contract,
  govContract: contract,
  fundraisingContract: contract,
  uniswapRouter: contract,
  uniswapFactory: contract,
  multisigFactory: contract,
  multisigEmitter: contract,
  charityApplications: contract,
  proxyAdmin: contract,
  usdcAddress: contract,
  wMaticAddress: contract,
  gasFwdFactory: contract,
}) as ObjectSchema<FormValues>;

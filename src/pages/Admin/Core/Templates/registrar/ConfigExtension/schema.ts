import * as Yup from "yup";
import { FormValues } from "./types";
import { SchemaShape } from "schemas/types";
import { walletAddr } from "schemas/string";
import { chainIds } from "constants/chainIds";
import { proposalShape } from "../../../../constants";

const contract = walletAddr(chainIds.polygon);

const shape: SchemaShape<FormValues> = {
  ...proposalShape,

  accountsContract: contract,
  applicationsReview: contract,
  charitySharesContract: contract,
  donationMatchCharitesContract: contract,
  fundraisingContract: contract,
  govContract: contract,
  haloTokenLpContract: contract,
  haloToken: contract,
  indexFundContract: contract,
  swapsRouter: contract,

  //wasm codes
  multisigFactory: contract,
  subdaoBondingTokenCode: contract,
  subdaoCw20TokenCode: contract,
  subdaoCw900Code: contract,
  subdaoDistributorCode: contract,
  subdaoGovCode: contract,
};

export const schema = Yup.object(shape);

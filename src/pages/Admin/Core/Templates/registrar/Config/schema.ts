import * as Yup from "yup";
import { RegistrarConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { percentString, positiveNumber } from "schemas/number";
import { contractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const contractAddrSchema = contractAddr.nullable();

const shape: SchemaShape<RegistrarConfigValues> = {
  ...proposalShape,
  //accounts code id
  accounts_code_id: positiveNumber,

  //splits
  split_default: percentString,
  split_max: percentString,
  split_min: percentString,

  //vault settings
  tax_rate: percentString,
  default_vault: contractAddrSchema,

  //contracts
  index_fund_contract: contractAddrSchema,
  treasury: contractAddrSchema,
  guardians_multisig_addr: contractAddrSchema,
  endowment_owners_group_addr: contractAddrSchema,
  halo_token: contractAddrSchema,
  gov_contract: contractAddrSchema,
  shares_contract: contractAddrSchema,
};

export const schema = Yup.object(shape);

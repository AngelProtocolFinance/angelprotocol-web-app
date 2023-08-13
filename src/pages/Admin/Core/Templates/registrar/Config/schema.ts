import { ObjectSchema, object } from "yup";
import { RegistrarConfigValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { percentString, positiveNumber } from "schemas/number";
import { contractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const contractAddrSchema = contractAddr.nullable();

export const schema = object<any, SchemaShape<RegistrarConfigValues>>({
  ...proposalShape,

  accounts_contract: contractAddrSchema,
  index_fund_contract: contractAddrSchema,
  treasury: contractAddrSchema,
  halo_token: contractAddrSchema,
  gov_contract: contractAddrSchema,
  charity_shares_contract: contractAddrSchema,
  applications_review: contractAddrSchema,
  applications_impact_review: contractAddrSchema,
  swaps_router: contractAddrSchema,
  split_default: percentString,
  split_max: percentString,
  split_min: percentString,
  cw3_code: positiveNumber,
  cw4_code: positiveNumber,
}) as ObjectSchema<RegistrarConfigValues>;

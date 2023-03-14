import * as Yup from "yup";
import { RegistrarConfigExtensionValues } from "pages/Admin/types";
import { SchemaShape } from "schemas/types";
import { positiveNumber } from "schemas/number";
import { contractAddr } from "schemas/string";
import { proposalShape } from "../../../../constants";

const contractAddrSchema = contractAddr.nullable();
const shape: SchemaShape<RegistrarConfigExtensionValues> = {
  ...proposalShape,

  accounts_contract: contractAddrSchema,
  accounts_settings_controller: contractAddrSchema,
  applications_review: contractAddrSchema,
  charity_shares_contract: contractAddrSchema,
  collector_addr: contractAddrSchema,
  donation_match_charites_contract: contractAddrSchema,
  fundraising_contract: contractAddrSchema,
  gov_contract: contractAddrSchema,
  halo_token_lp_contract: contractAddrSchema,
  halo_token: contractAddrSchema,
  index_fund_contract: contractAddrSchema,
  swap_factory: contractAddrSchema,
  swaps_router: contractAddrSchema,

  //wasm codes
  cw3_code: positiveNumber,
  cw4_code: positiveNumber,
  donation_match_code: positiveNumber, // donation matching contract wasm code
  subdao_bonding_token_code: positiveNumber, // subdao gov token (w/ bonding-curve) wasm code
  subdao_cw20_token_code: positiveNumber, // subdao gov token (basic CW20) wasm code
  subdao_cw900_code: positiveNumber, // subdao gov ve-CURVE contract for locked token voting
  subdao_distributor_code: positiveNumber, // subdao gov fee distributor wasm code
  subdao_gov_code: positiveNumber, // subdao gov wasm code
};

export const schema = Yup.object(shape);

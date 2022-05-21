import { MsgExecuteContract } from "@terra-money/terra.js";
import { Charity } from "types/server/aws";
import {
  EndowmentQueryOptions,
  RegistrarConfigPayload,
  RegistrarCreateEndowmentPayload,
  RegistrarOwnerPayload,
  StatusChangePayload,
} from "types/server/contracts";
import { ContractQueryArgs as CQA } from "services/types";
import { WalletProxy } from "providers/WalletProvider";
import { contracts } from "constants/contracts";
import { sc } from "constants/sc";
import Contract from "./Contract";

export default class Registrar extends Contract {
  address: string;
  vaultsRate: CQA;
  config: CQA;

  endowmentList: (args: EndowmentQueryOptions) => CQA;

  constructor(wallet?: WalletProxy) {
    super(wallet);
    this.address = contracts[this.chainID][sc.registrar];

    this.endowmentList = (queryOptions) => ({
      address: this.address,
      msg: {
        endowment_list: queryOptions,
      },
    });

    this.vaultsRate = {
      address: this.address,
      msg: {
        approved_vault_rate_list: {},
      },
    };

    this.config = {
      address: this.address,
      msg: { config: {} },
    };
  }

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_endowment_status: payload,
    });
  }

  createEmbeddedConfigUpdateMsg(payload: RegistrarConfigPayload) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_config: payload,
    });
  }

  createEndowmentCreationMsg(charity: Charity) {
    return new MsgExecuteContract(this.walletAddr!, this.address, {
      create_endowment: createEndowmentCreationMsgPayload(charity),
    });
  }

  createEmbeddedOwnerUpdateMsg(payload: RegistrarOwnerPayload) {
    return this.createdEmbeddedWasmMsg([], this.address, {
      update_owner: payload,
    });
  }
}
export interface R extends Registrar {}
export type T = typeof Registrar;

function createEndowmentCreationMsgPayload(
  charity: Charity
): RegistrarCreateEndowmentPayload {
  return {
    beneficiary: charity.Metadata.TerraWallet,
    cw4_members: [],
    guardians_multisig_addr: undefined,
    maturity_height: undefined,
    maturity_time: undefined,
    owner: charity.Metadata.TerraWallet,
    profile: {
      annual_revenue: undefined,
      average_annual_budget: undefined,
      charity_navigator_rating: undefined,
      contact_email: charity.ContactPerson.Email,
      country_of_origin: undefined,
      endow_type: "Charity",
      image: charity.Metadata.Banner.publicUrl!,
      logo: charity.Metadata.CharityLogo.publicUrl!,
      name: charity.Registration.CharityName,
      number_of_employees: undefined,
      overview: charity.Metadata.CharityOverview,
      registration_number: undefined,
      social_media_urls: {
        facebook: undefined,
        linkedin: undefined,
        twitter: undefined,
      },
      street_address: undefined,
      tier: charity.Registration.Tier!,
      un_sdg: charity.Registration.UN_SDG,
      url: charity.Registration.Website,
    },
    withdraw_before_maturity: false,
  };
}

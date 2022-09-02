import { Coin } from "@cosmjs/proto-signing";
import { Charity } from "types/aws";
import {
  DepositPayload,
  RegistrarCreateEndowmentPayload,
  UpdateProfilePayload,
  WithdrawLiqPayload,
  WithdrawPayload,
} from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  private static address = contracts.accounts;

  //future: add id in constructor once id is outside payload

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      withdraw: payload,
    });
  }

  createEmbeddedWithdrawLiqMsg(payload: WithdrawLiqPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      withdraw_liquid: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_profile: payload,
    });
  }

  createDepositMsg(payload: DepositPayload, funds: Coin[]) {
    return this.createExecuteContractMsg(
      Account.address,
      {
        deposit: payload,
      },
      funds
    );
  }

  createEndowmentCreationMsg(charity: Charity) {
    return this.createExecuteContractMsg(Account.address, {
      create_endowment: createEndowmentCreationMsgPayload(charity),
    });
  }
}

function createEndowmentCreationMsgPayload(
  charity: Charity
): RegistrarCreateEndowmentPayload {
  return {
    owner: charity.Metadata.JunoWallet,
    beneficiary: charity.Metadata.JunoWallet,
    withdraw_before_maturity: false,
    maturity_time: undefined,
    maturity_height: undefined,
    profile: {
      name: charity.Registration.CharityName, // name of the Charity Endowment
      overview: charity.Metadata.CharityOverview,
      categories: { sdgs: [charity.Registration.UN_SDG], general: [] },
      tier: charity.Registration.Tier!, // SHOULD NOT be editable for now (only the Config.owner, ie via the Gov contract or AP CW3 Multisig can set/update)
      logo: charity.Metadata.CharityLogo.publicUrl || "",
      image: charity.Metadata.Banner.publicUrl || "",
      url: charity.Registration.Website,
      registration_number: "",
      country_of_origin: "",
      street_address: "",
      contact_email:
        charity.Registration.CharityName_ContactEmail?.split("_")[1],
      social_media_urls: {
        facebook: "",
        linkedin: "",
        twitter: "",
      },
      number_of_employees: 1,
      average_annual_budget: "",
      annual_revenue: "",
      charity_navigator_rating: "",
      endow_type: "Charity",
    },
    cw4_members: [{ addr: charity.Metadata.JunoWallet, weight: 1 }],
    kyc_donors_only: charity.Metadata.KycDonorsOnly, //set to false initially
    cw3_threshold: { absolute_percentage: { percentage: "0.5" } }, //set initial 50%
    cw3_max_voting_period: 86400,
  };
}

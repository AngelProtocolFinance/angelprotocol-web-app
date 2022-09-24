import { Coin } from "@cosmjs/proto-signing";
import {
  DepositPayload,
  StatusChangePayload,
  UpdateProfilePayload,
  UpdateStategyPayload,
  WithdrawPayload,
} from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class Account extends Contract {
  private static address = contracts.accounts;

  //future: add id in constructor once id is outside payload

  createEmbeddedChangeEndowmentStatusMsg(payload: StatusChangePayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_endowment_status: payload,
    });
  }

  createEmbeddedWithdrawMsg(payload: WithdrawPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      withdraw: payload,
    });
  }

  createEmbeddedStrategyUpdateMsg(payload: UpdateStategyPayload) {
    return this.createEmbeddedWasmMsg(Account.address, {
      update_strategies: payload,
    });
  }

  createEmbeddedUpdateProfileMsg(payload: UpdateProfilePayload) {
    return [
      // profile edit msg
      this.createEmbeddedWasmMsg(Account.address, {
        update_profile: {
          id: payload.id,
          overview: payload.overview,
          url: payload.url,
          registration_number: payload.registration_number,
          street_address: payload.street_address,
          country_of_origin: payload.country_of_origin,
          contact_email: payload.contact_email,
          facebook: payload.facebook,
          twitter: payload.twitter,
          linkedin: payload.linkedin,
          number_of_employees: payload.number_of_employees,
          average_annual_budget: payload.average_annual_budget,
          annual_revenue: payload.annual_revenue,
          charity_navigator_rating: payload.charity_navigator_rating,
        },
      }),
      // endowment settings edit msg
      this.createEmbeddedWasmMsg(Account.address, {
        update_endowment_settings: {
          id: payload.id,
          name: payload.name,
          categories: {
            sdgs: payload.categories.sdgs,
            general: [],
          },
          tier: payload.tier,
          logo: payload.logo,
          image: payload.image,
          endow_type: payload.endow_type,
          kyc_donors_only: payload.kyc_donors_only,
        },
      }),
    ];
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
}

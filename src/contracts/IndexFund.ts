import { FundDetails, IndexFundOwnerPayload } from "types/contracts";
import { contracts } from "constants/contracts";
import Contract from "./Contract";

export default class IndexFund extends Contract {
  private static address = contracts["index-fund"];

  createEmbeddedOwnerUpdateMsg(payload: IndexFundOwnerPayload) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      update_owner: payload,
    });
  }

  async getFundDetails(fundId: number) {
    const fundDetailsRes = await this.query<{ fund: FundDetails }>(
      IndexFund.address,
      {
        fund_details: { fund_id: fundId },
      }
    );
    return fundDetailsRes.fund;
  }

  createEmbeddedCreateFundMsg(fundDetails: Omit<FundDetails, "id">) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      create_fund: { ...fundDetails },
    });
  }

  createEmbeddedUpdateMembersMsg(
    fundId: number,
    toAdd: string[],
    toRemove: string[]
  ) {
    return this.createEmbeddedWasmMsg(IndexFund.address, {
      update_members: { fund_id: fundId, add: toAdd, remove: toRemove },
    });
  }
}

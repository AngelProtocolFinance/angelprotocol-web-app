import { TxMeta } from "contracts/createTx/types";
import { TagPayload } from "types/third-party/redux";
import { ApesTag, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";

export function getTagPayloads(type?: TxMeta["id"]): TagPayload[] {
  const _tags = [...defaultProposalTags];
  const _apes: ApesTag[] = [];

  switch (type) {
    case "accounts.update-controller":
      _tags.push("accounts.endowment");
      break;
    case "index-fund.update-alliance-list":
      _tags.push("index-fund.alliance-members");
      break;
    case "index-fund.remove-fund":
    case "index-fund.create-fund":
    case "index-fund.update-members": //fund members shown via selecFromResult (fund_list)
      _tags.push("index-fund.funds");
      break;

    case "index-fund.config":
    case "index-fund.update-owner":
      _tags.push("index-fund.config");
      break;

    case "multisig.add-owner":
    case "multisig.remove-owner":
      _tags.push("multisig.members");
      break;

    case "multisig.change-threshold":
      _tags.push("multisig.threshold");
      break;

    case "erc20.transfer":
      _apes.push("chain"); //assuming user wallet is beneficiary
      break;

    case "accounts.invest":
    case "accounts.redeem":
      _tags.push("accounts.state");
      break;

    case "accounts.update-status":
      _tags.push("accounts.endowment");
      break;

    case "registrar.update-config":
    case "registrar.update-owner":
      _tags.push("registrar.config");
      break;
  }

  return [invalidateJunoTags(_tags), invalidateApesTags(_apes)];
}

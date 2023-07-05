import { TagPayload } from "types/third-party/redux";
import { TxMeta } from "types/tx";
import { ApesTag, invalidateApesTags } from "services/apes";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";

export function getTagPayloads(type?: TxMeta["id"]): TagPayload[] {
  const _tags = [...defaultProposalTags];
  const _apes: ApesTag[] = [];

  switch (type) {
    case "accounts.update-controller":
    case "accounts.update-settings":
    case "accounts.update-fee-settings":
      _tags.push("accounts.endowment");
      break;

    case "index-fund.remove-fund":
    case "index-fund.create-fund":
    case "index-fund.config":
    case "index-fund.update-owner":
      _tags.push("index-fund.config");
      break;

    case "multisig.add-owners":
    case "multisig.remove-owners":
      _tags.push("multisig.members");
      _tags.push("multisig.threshold"); //cases where threshold > members.length
      break;

    case "multisig.change-threshold":
      _tags.push("multisig.threshold");
      break;

    case "multisig.change-auto-execute":
      _tags.push("multisig.require-execution");
      break;

    case "multisig/review.confirm-prop":
      _tags.push("multisig/review.prop-confirms");
      break;

    case "multisig/review.execute-prop":
      _tags.push("multisig/review.proposal");
      break;

    case "erc20.transfer":
      _apes.push("chain"); //assuming user wallet is beneficiary
      break;

    case "accounts.invest":
    case "accounts.redeem":
      _tags.push("accounts.state");
      break;

    case "accounts.close":
      _tags.push("accounts.endowment");
      break;

    case "registrar.update-config":
    case "registrar.update-owner":
      _tags.push("registrar.config");
      break;
  }

  return [invalidateJunoTags(_tags), invalidateApesTags(_apes)];
}

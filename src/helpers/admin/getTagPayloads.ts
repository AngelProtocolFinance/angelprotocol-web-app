import { ProposalMeta } from "pages/Admin/types";
import { TagPayload } from "types/third-party/redux";
import { invalidateJunoTags } from "services/juno";
import { defaultProposalTags } from "services/juno/tags";

export function getTagPayloads(type?: ProposalMeta["type"]): TagPayload[] {
  const _tags = [...defaultProposalTags];

  switch (type) {
    case "endow_controller":
      _tags.push("accounts.endowment");
      break;
    case "if_alliance":
      _tags.push("index-fund.alliance-members");
      break;
    case "if_remove":
    case "if_create":
    case "if_members": //fund members shown via selecFromResult (fund_list)
      _tags.push("index-fund.funds");
      break;

    case "if_config":
    case "if_owner":
      _tags.push("index-fund.config");
      break;

    case "cw4_members":
      _tags.push("multisig.members");
      break;

    case "review_cw3_config":
    case "cw3_config":
      _tags.push("multisig.config");
      break;

    case "acc_invest":
    case "acc_withdraw":
      _tags.push("accounts.state");
      break;

    case "acc_strategy":
      _tags.push("accounts.endowment");
      break;

    case "acc_endow_status":
      _tags.push("accounts.endowment");
      break;

    case "reg_owner":
      _tags.push("registrar.config");
      break;
    case "reg_config_extension":
      _tags.push("registrar.config-extension");
      break;
  }

  return [invalidateJunoTags(_tags)];
}

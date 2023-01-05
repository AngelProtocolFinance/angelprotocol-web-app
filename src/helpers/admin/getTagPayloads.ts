import { ProposalMeta } from "pages/Admin/types";
import { TagPayload } from "services/types";
import { invalidateJunoTags } from "services/juno";
import {
  accountTags,
  adminTags,
  defaultProposalTags,
  indexfundTags,
  registrarTags,
} from "services/juno/tags";

export function getTagPayloads(type?: ProposalMeta["type"]): TagPayload[] {
  const _tags = [...defaultProposalTags];

  switch (type) {
    case "if_alliance":
      _tags.push({
        type: "indexfund",
        id: indexfundTags.alliance_members,
      });
      break;
    case "if_remove":
    case "if_create":
    case "if_members": //fund members shown via selecFromResult (fund_list)
      _tags.push({
        type: "indexfund",
        id: indexfundTags.fund_list,
      });
      break;

    case "if_config":
    case "if_owner":
      _tags.push({
        type: "indexfund",
        id: indexfundTags.config,
      });
      break;

    case "cw4_members":
      _tags.push({
        type: "admin",
        id: adminTags.members,
      });
      break;

    case "review_cw3_config":
    case "cw3_config":
      _tags.push({
        type: "admin",
        id: adminTags.config,
      });
      break;

    case "acc_withdraw":
      _tags.push({
        type: "account",
        id: accountTags.balance,
      });
      break;

    case "acc_profile":
      _tags.push({
        type: "account",
        id: accountTags.profile,
      });
      break;

    case "acc_endow_status":
      _tags.push({
        type: "account",
        id: accountTags.endowments,
      });
      break;

    case "reg_owner":
    case "reg_config":
      _tags.push({
        type: "registrar",
        id: registrarTags.config,
      });
      break;
  }

  return [invalidateJunoTags(_tags)];
}

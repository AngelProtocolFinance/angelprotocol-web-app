import { ProposalMeta } from "../types";
import { Tag, TagPayload } from "slices/transaction/types";
import { invalidateJunoTags } from "services/juno";
import {
  accountTags,
  adminTags,
  customTags,
  indexfundTags,
  junoTags,
  registrarTags,
} from "services/juno/tags";

const defaultTags: Tag[] = [
  //basic tags to invalidate
  { type: junoTags.admin, id: adminTags.proposals },
  { type: junoTags.custom, id: customTags.proposalDetails },
];

export const defaultTagPayloads: TagPayload[] = [
  invalidateJunoTags(defaultTags),
];

export function getTagPayloads(
  type?: ProposalMeta["type"],
  isSingle?: boolean
): TagPayload[] {
  const _tags = [...defaultTags];

  switch (type) {
    case "if_alliance":
      _tags.push({
        type: junoTags.indexfund,
        id: indexfundTags.alliance_members,
      });
      break;
    case "if_remove":
    case "if_create":
    case "if_members": //fund members shown via selecFromResult (fund_list)
      _tags.push({
        type: junoTags.indexfund,
        id: indexfundTags.fund_list,
      });
      break;

    case "if_config":
    case "if_owner":
      _tags.push({
        type: junoTags.indexfund,
        id: indexfundTags.config,
      });
      break;

    case "cw4_members":
      _tags.push({
        type: junoTags.admin,
        id: adminTags.members,
      });
      break;

    case "cw3_config":
      _tags.push({
        type: junoTags.admin,
        id: adminTags.config,
      });
      break;

    case "acc_withdraw":
      _tags.push({
        type: junoTags.account,
        id: accountTags.balance,
      });
      break;

    case "acc_profile":
      _tags.push({
        type: junoTags.account,
        id: accountTags.profile,
      });
      break;

    case "acc_endow_status":
      _tags.push({
        type: junoTags.account,
        id: accountTags.endowments, //via selectFromResult (endowments), TODO: convert to {endowment:{}} query
      });
      break;

    case "reg_owner":
    case "reg_config":
      _tags.push({
        type: junoTags.registrar,
        id: registrarTags.config,
      });
      break;
  }

  return [invalidateJunoTags(isSingle ? _tags : defaultTags)];
}

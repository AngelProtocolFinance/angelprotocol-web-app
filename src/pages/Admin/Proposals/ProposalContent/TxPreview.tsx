import { ProposalMeta, proposalTypes } from "../../types";
import MemberUpdatePreview from "./MemberUpdatePreview";
import WithdrawPreview from "./WithdrawPreview";

export default function TxPreview(props: ProposalMeta) {
  switch (props.type) {
    case proposalTypes.endowment_withdraw:
      return <WithdrawPreview {...props.data} />;
    case proposalTypes.endowment_updateStatus:
      return <div>{props.data}</div>;
    case proposalTypes.adminGroup_updateMembers:
      return <MemberUpdatePreview {...props.data} />;
    default:
      return <div>no preview</div>;
  }
}

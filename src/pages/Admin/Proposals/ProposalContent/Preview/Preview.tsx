import EndowmentStatusUpdate from "./EndowmentStatusUpdate";
import { ProposalMeta, proposalTypes } from "../../../types";
import MemberUpdate from "./MemberUpdate";
import Withdraw from "./Withdraw";
import Fund from "./Fund";
import AllianceUpdate from "./AllianceUpdate";

export default function Preview(props: ProposalMeta) {
  switch (props.type) {
    case proposalTypes.endowment_withdraw:
      return <Withdraw {...props.data} />;
    case proposalTypes.endowment_updateStatus:
      return <EndowmentStatusUpdate {...props.data} />;
    case proposalTypes.adminGroup_updateMembers:
      return <MemberUpdate {...props.data} />;
    case proposalTypes.indexFund_createFund:
      return <Fund {...props.data} />;
    case proposalTypes.indexFund_removeFund:
      return <Fund {...props.data} />;
    case proposalTypes.indexFund_allianceEdits:
      return <AllianceUpdate {...props.data} />;
    default:
      return <div>no preview</div>;
  }
}

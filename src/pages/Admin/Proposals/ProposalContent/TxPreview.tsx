import { ProposalMeta, proposalTypes } from "../../types";
import WithdrawPreview from "./WithdrawPreview";

export default function TxPreview(props: ProposalMeta) {
  switch (props.type) {
    case proposalTypes.endowment_withdraw:
      return <WithdrawPreview {...props.data} />;
    case proposalTypes.endowment_updateStatus:
      return <div>{props.data}</div>;
    default:
      return <div>no preview</div>;
  }
}

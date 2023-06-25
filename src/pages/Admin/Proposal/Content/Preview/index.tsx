import { TxMeta } from "types/tx";
import DiffTable from "./DiffTable";
import EndowmentStatusUpdate from "./EndowmentStatusUpdate";
import Fund from "./Fund";
import FundMemberUpdate from "./FundMemberUpdate";
import FundToDelete from "./FundToDelete";
import FundTransfer from "./FundTransfer";
import MultisigMember from "./MultisigMember";
import OwnerUpdate from "./OwnerUpdate";
import ThresholdUpdate from "./ThresholdUpdate";
import Withdraw from "./Withdraw";

export default function Preview(props: TxMeta) {
  if (!props.data) return <div className="p-2">no preview</div>;
  switch (props.id) {
    /**_indexfund */
    case "index-fund.create-fund":
      return <Fund {...props.data} />;
    case "index-fund.remove-fund":
      return <FundToDelete {...props.data} />;
    case "index-fund.update-members":
      return <FundMemberUpdate {...props.data} />;
    case "index-fund.config":
    case "registrar.update-config":
    case "accounts.update-controller":
    case "accounts.update-fee-settings":
    case "accounts.update-settings":
      return <DiffTable diffs={props.data} />;
    case "index-fund.update-owner":
    case "registrar.update-owner":
      return <OwnerUpdate {...props.data} />;

    /** multisig */
    case "multisig.change-threshold":
      return <ThresholdUpdate {...props.data} />;
    case "multisig.add-owners":
    case "multisig.remove-owners":
      return <MultisigMember {...props.data} />;

    /** _account */
    case "accounts.close":
      return <EndowmentStatusUpdate {...props.data} />;
    case "accounts.withdraw":
      return <Withdraw {...props.data} />;

    case "erc20.transfer":
      return <FundTransfer {...props.data} />;

    default:
      return <div className="p-2">no preview</div>;
  }
}

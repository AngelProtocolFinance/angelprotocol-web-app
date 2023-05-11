import { TxMeta } from "contracts/createTx/types";
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
      return <DiffTable diffSet={props.data} />;
    case "index-fund.update-owner":
    case "registrar.update-owner":
      return <OwnerUpdate {...props.data} />;

    /** multisig */
    case "multisig.change-threshold":
      return <ThresholdUpdate {...props.data} />;
    case "multisig.add-owner":
    case "multisig.remove-owner":
      return <MultisigMember {...props.data} />;

    /** _account */
    case "accounts.update-status":
      return <EndowmentStatusUpdate {...props.data} />;
    case "accounts.withdraw":
    case "locked-withdraw.propose":
      return <Withdraw {...props.data} />;

    case "erc20.transfer":
      return <FundTransfer {...props.data} />;

    case "registrar.update-config":
      return <DiffTable diffSet={props.data} />;

    default:
      return <div className="p-2">no preview</div>;
  }
}

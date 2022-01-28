import { useConnectedWallet } from "@terra-money/wallet-provider";
import { toast } from "react-toastify";
import { useRemoveMemberMutation } from "../../../services/aws/alliance/alliance";

export default function useRemoveMember() {
  const [removeMember] = useRemoveMemberMutation();
  const wallet = useConnectedWallet();

  async function removeAllianceMember(name: string) {
    const response: any = await removeMember({
      name: name.replace(/\s+/g, "-"),
      wallet: wallet?.terraAddress,
    });
    const result = response.data ? response : response.error;
    if (result.status === 500) {
      toast.error("Deleting member was failed. Please try again.");
    } else if (result.error) {
      toast.error(result.error.data.message);
    } else {
      if (
        result.status === 400 ||
        result.status === 401 ||
        result.status === 403 ||
        result.status === 415
      ) {
        toast.error(result.data.message);
      } else {
        toast.success("Deleted successfully.");
        return result;
      }
    }
    return false;
  }

  return removeAllianceMember;
}

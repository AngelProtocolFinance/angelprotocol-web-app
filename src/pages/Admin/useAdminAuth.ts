import { useConnectedWallet } from "@terra-money/wallet-provider";
import Admin from "contracts/Admin";
import { useEffect, useState } from "react";
import { updateAdminStatus } from "services/auth/authSlice";
import { AdminAuthStatus } from "services/auth/types";
import { useSetter } from "store/accessors";

const storage_key = "adminAuthStatus";
type SavedStatus = { [index: string]: AdminAuthStatus };

export default function useAdminAuth() {
  const [loading, setLoading] = useState(false);
  const wallet = useConnectedWallet();
  const dispatch = useSetter();

  useEffect(() => {
    (async () => {
      try {
        if (!wallet) {
          dispatch(updateAdminStatus("disconnected"));
          console.log("disconnected");
          return;
        }
        //get local storage status
        const saved_status = localStorage.getItem(
          storage_key
        ) as SavedStatus | null;

        if (saved_status?.[wallet.walletAddress] === "authorized") {
          dispatch(updateAdminStatus("authorized"));
          return;
        }
        setLoading(true);
        //if no saved status in storage, get fresh status
        const contract = new Admin(wallet);
        const apCW4_member = await contract.get_apCW4_member(
          wallet.walletAddress
        );

        if (!apCW4_member.weight) {
          dispatch(updateAdminStatus("unauthorized"));
          return;
        }
        //if member, save auth status in memory and storage
        dispatch(updateAdminStatus("authorized"));
        localStorage.setItem(
          storage_key,
          JSON.stringify({ [wallet.walletAddress]: "authorized" })
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [wallet]);

  return { loading };
}

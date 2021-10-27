import { setIcon } from "components/WalletSuite/manageIcon";
import { Connectors, dWindow, Icons } from "components/WalletSuite/types";
import { useGetState } from "components/WalletSuite/WalletSuite";
import { useWallet } from "use-wallet";

//or just let user know they need to install?
const metamask_link =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";

const xdefi_link =
  "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf?hl=en";

export default function useAction(type: Connectors, icon: Icons) {
  let modIcon = icon;
  const dwindow: dWindow = window;
  const wallet = useWallet();
  const { isLoading } = useGetState();

  async function handleConnect() {
    try {
      if (type === Connectors.ledger) {
        alert("wip: need proper rpc url, and need actual ledger to test??");
        return;
      }

      if (type === Connectors.injected && icon === Icons.metamask) {
        //
        if (!dwindow.ethereum) {
          dwindow.open(metamask_link, "_blank", "noopener noreferrer");
          return;
        }
        //prompt user to disable xdefi priority?
        //if xdefi is prioritized by user in menu/Prioritize_xdefi,
        //conencting to metamask will just point to xdefi, --> so update icon
        if (dwindow.xfi.ethereum) {
          alert(
            "kindly remove priority to xdefi and refresh page to use metamask"
          );
          modIcon = Icons.xdefi;
        }
      }

      if (type === Connectors.injected && icon === Icons.xdefi) {
        //if no xfi object is injected, xdefi is not installed
        if (!dwindow.xfi) {
          dwindow.open(xdefi_link, "_blank", "noopener noreferrer");
          return;
        }

        if (!dwindow.xfi.ethereum) {
          //xdefi can only be properly used if menu/Prioritize_xdefi is enabled by user
          //if not enabled, connector will just revert to metamask --> so update icon
          alert(
            "kindly prioritize xdefi to use it menu/prioritize xdefi and refresh the page"
          );
          modIcon = Icons.metamask;
        }
      }

      await wallet.connect(type);
      setIcon(modIcon);
    } catch (err) {
      console.error(err);
    }
  }

  return { handleConnect, isLoading };
}

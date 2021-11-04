import { setIcon } from "components/WalletSuite/manageIcon";
import Warning, { Props } from "components/WalletSuite/Warning";
import { useGetState } from "components/WalletSuite/WalletSuite";
import { Connectors, dWindow, Icons } from "components/WalletSuite/types";
import { useWallet } from "use-wallet";
import { useSetModal } from "components/Nodal/Nodal";

export default function useAction(type: Connectors, icon: Icons) {
  let modIcon = icon;
  const dwindow: dWindow = window;
  const wallet = useWallet();
  const { isLoading } = useGetState();
  const { showModal } = useSetModal();

  async function handleConnect() {
    try {
      if (type === Connectors.ledger) {
        showModal<Props>(Warning, {
          text: "Not available at the moment.",
        });
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
          showModal<Props>(Warning, {
            text: "To use Metamask, you need to remove priority to XDEFI wallet - then refresh the page",
          });
          return;
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
          showModal<Props>(Warning, {
            text: "Kindly prioritize XDEFI wallet to use it - then refresh the page",
          });
          return;
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

//or just let user know they need to install?
const metamask_link =
  "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en";

const xdefi_link =
  "https://chrome.google.com/webstore/detail/xdefi-wallet/hmeobnfnfcmdkdcmlblgagmfpfboieaf?hl=en";

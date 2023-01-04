import { WalletProvider } from "@terra-money/wallet-provider";
import { Flip, ToastContainer, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ModalContext from "contexts/ModalContext";
import Wallet from "contexts/WalletContext";
import WalletContext from "contexts/WalletContext";
import Icon from "components/Icon";
import Seo from "components/Seo";
import Footer from "./Footer";
import Header from "./Header";
import Views from "./Views";
import { chainOptions } from "./chainOptions";

export default function App() {
  return (
    <WalletProvider {...chainOptions}>
      <Wallet>
        <WalletContext>
          <ToastContainer
            closeButton={() => (
              <Icon
                type="Close"
                className="text-gray-d2 dark:text-white hover:text-orange hover:dark:text-orange pr-1 self-start"
                size={22}
              />
            )}
            toastClassName={(options) =>
              `font-work text-sm bg-white dark:bg-blue-d7 border border-prim flex items-center ${textColor(
                options?.type
              )} p-2 rounded`
            }
            transition={Flip}
            position="top-right"
            autoClose={2000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable={false}
            pauseOnHover
          />
          <ModalContext>
            <div className="grid grid-rows-[auto_1fr_auto] bg-gray-l5 dark:bg-blue-d5 text-gray-d2 dark:text-white">
              <Seo /> {/* Load all defaults for SEO meta tags */}
              <Header classes="sticky top-0 z-20" />
              <Views />
              <Footer />
            </div>
          </ModalContext>
        </WalletContext>
      </Wallet>
    </WalletProvider>
  );
}

function textColor(type: TypeOptions | undefined) {
  switch (type) {
    case "info":
      return "text-blue dark:text-blue-l2";
    case "warning":
      return "text-orange-d1 dark:text-orange-l1";
    case "success":
      return "text-green dark:text-green-l2";
    case "error":
      return "text-red dark:text-red-l2";
    default:
      return "text-gray-d2 dark:text-white";
  }
}

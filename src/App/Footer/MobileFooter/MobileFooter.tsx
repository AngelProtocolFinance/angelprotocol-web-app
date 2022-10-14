import WalletSuite from "App/Header/WalletSuite";
import Logo from "./Logo";
import Socials from "./Socials";

export default function MobileFooter() {
  return (
    <div className="flex sm:hidden flex-col items-center px-6 bg-blue dark:bg-blue-d4 text-white">
      <div className="flex flex-col items-center pt-6 pb-10 gap-6 border-b border-gray-l2 dark:border-gray-l3">
        <Logo />
        <Socials />
        <WalletSuite />
      </div>
    </div>
  );
}

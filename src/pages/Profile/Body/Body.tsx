import Balances from "./Balances";
import GeneralInfo from "./GeneralInfo";
import NameAddressSection from "./NameAddressSection";
import UrlDonateSection from "./UrlDonateSection";

export default function Body() {
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-l5 text-gray-d2 dark:bg-blue-d4 dark:text-white">
      <div className="padded-container grid gap-8 justify-items-center w-full h-full pt-32 pb-8 lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[auto_auto] lg:justify-items-start lg:items-end lg:gap-16 lg:pt-6 lg:pb-20">
        <UrlDonateSection className="order-2 lg:order-1 lg:col-span-2" />

        <NameAddressSection className="order-1 lg:order-2 lg:pl-2" />

        <Balances className="order-3 lg:col-span-1 lg:justify-self-end" />

        <GeneralInfo className="order-4 xl:col-span-2 w-full h-full" />
      </div>
    </div>
  );
}

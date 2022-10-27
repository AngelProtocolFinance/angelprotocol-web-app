import Balances from "./Balances";
import NameAddressSection from "./NameAddressSection";
import UrlDonateSection from "./UrlDonateSection";

export default function Body() {
  return (
    <div className="flex justify-center items-center w-full h-full bg-gray-l5 text-gray-d2 dark:bg-blue-d4 dark:text-white">
      <div className="padded-container grid gap-8 justify-items-center w-full h-full pt-32 pb-8 xl:grid-rows-[auto_auto_1fr] xl:grid-cols-[auto_auto] xl:items-end xl:gap-16 xl:pt-6 xl:pb-20">
        <UrlDonateSection className="order-2 xl:order-1 xl:col-span-2" />

        <NameAddressSection className="order-1 xl:order-2 xl:pl-2" />

        <Balances className="order-3 xl:col-span-1 xl:justify-self-end" />

        <div className="order-4 xl:col-span-2 w-full h-40">Overview</div>
      </div>
    </div>
  );
}

import Balances from "./Balances";
import NameAddressSection from "./NameAddressSection";
import UrlDonateSection from "./UrlDonateSection";

export default function Body() {
  return (
    <div className="flex flex-col gap-8 items-center w-full h-full pt-32 px-6 pb-8 bg-gray-l5 dark:bg-blue-d4 lg:grid lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[auto_auto] lg:items-end lg:gap-16 xl:pt-6 xl:px-20 xl:pb-20">
      <UrlDonateSection className="order-2 xl:order-1 xl:col-span-2" />

      <NameAddressSection className="order-1 xl:order-2" />

      <Balances className="order-3 lg:col-span-2 xl:col-span-1 xl:justify-self-end" />

      <div className="order-4 xl:col-span-2 w-full h-40">Overview</div>
    </div>
  );
}

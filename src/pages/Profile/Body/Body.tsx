import Balances from "./Balances";
import NameAddressSection from "./NameAddressSection";
import UrlDonateSection from "./UrlDonateSection";

export default function Body() {
  return (
    <div className="padded-container grid justify-items-center xl:justify-items-start xl:grid-cols-[1fr_auto] gap-y-8">
      <NameAddressSection className="xl:row-start-2 xl:self-center" />
      <UrlDonateSection className="xl:col-start-2" />
      <Balances className="xl:row-start-2" />

      <div className="">Overview</div>
    </div>
  );
}

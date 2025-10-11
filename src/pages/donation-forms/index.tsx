import { Partners } from "../@sections/partners";
import { DonationFormInfo } from "./donation-form-info";

export default function Page() {
  return (
    <div className="pt-20">
      <DonationFormInfo classes="px-5 xl:container xl:mx-auto" />
      <Partners classes="xl:container xl:mx-auto px-5 mt-16" />
    </div>
  );
}

import { Partners } from "../@sections/partners";
import { Steps } from "../@sections/steps";
import { Ctas } from "./ctas";
import { DonationFormInfo } from "./donation-form-info";

export default function Page() {
  return (
    <div className="pt-20">
      <DonationFormInfo classes="px-5 xl:container xl:mx-auto" />
      <Partners classes="xl:container xl:mx-auto px-5 mt-16" />
      <Ctas classes="xl:container xl:mx-auto px-5" />
      <Steps classes="xl:container xl:mx-auto px-5" />
    </div>
  );
}

import { DonaterConfigFromWidget } from "types/widget";
import KYCForm from "components/KYCForm";
import { useGetter, useSetter } from "store/accessors";
import { setKYC, setStep } from "slices/donation";
import DonateMethods from "./DonateMethods";
import Result from "./Result";
import Submit from "./Submit";

type Props = { config: DonaterConfigFromWidget | null };

export default function CurrentStep({ config }: Props) {
  const state = useGetter((state) => state.donation);
  const dispatch = useSetter();

  if (state.step === "init") return <></>; // <Steps /> sets to step 1 onMount

  if (state.step === "tx") {
    return <Result {...state} classes="justify-self-center p-4 @md:p-8" />;
  }

  if (state.step === "submit") {
    return <Submit {...state} />;
  }

  if (state.step === "kyc-form") {
    return (
      <KYCForm
        type="on-donation"
        classes="grid gap-5 sm:grid-cols-2 p-4 @md:p-8"
        defaultValues={state.kyc}
        recipient={state.recipient}
        onBack={() => {
          //kyc is always after donate form
          dispatch(setStep("donate-form"));
        }}
        onSubmit={(data) => {
          dispatch(setKYC(data));
        }}
      />
    );
  }

  state.step satisfies "donate-form";
  return <DonateMethods donaterConfig={config} state={state} />;
}

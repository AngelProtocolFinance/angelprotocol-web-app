import { FormProvider, useForm } from "react-hook-form";
import Split from "../../../Split";
import AdvancedOptions, {
  type AdvancedOptionsDisplay,
} from "../../AdvancedOptions";

type Props = {
  advanceOptDisplay: AdvancedOptionsDisplay;
};
type FV = {
  pctLiquidSplit: number;
};

export default function Stripe({ advanceOptDisplay }: Props) {
  const methods = useForm<FV>({ defaultValues: { pctLiquidSplit: 50 } });
  return (
    <FormProvider {...methods}>
      <form>
        <AdvancedOptions
          display={advanceOptDisplay}
          splitComponent={
            <Split<FV, "pctLiquidSplit">
              className="mb-6"
              liqPctField="pctLiquidSplit"
            />
          }
        />
      </form>
    </FormProvider>
  );
}

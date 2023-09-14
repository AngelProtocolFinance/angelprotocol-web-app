import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormValues } from "./types";
import { WidgetConfig } from "types/widget";
import { useSetter } from "store/accessors";
import { updateWidgetConfig } from "slices/widget";
import Form from "./Form";

export default function WidgetUrlGenerator() {
  const dispatch = useSetter();
  const methods = useForm<FormValues>({
    defaultValues: {
      tokenWhitelist: [],
      endowment: { id: 0, name: "" },
      isDescriptionTextShown: true,
      isAdvancedOptionsHidden: false,
      isAdvancedOptionsExpanded: true,
      liquidPercentage: 50,
    },
  });

  const submit: SubmitHandler<FormValues> = async (fv) => {
    const newConfig: WidgetConfig = {
      endowment: fv.endowment,
      isDescriptionTextShown: fv.isDescriptionTextShown,
      advancedOptions: {
        liquidSplitPct: fv.liquidPercentage,
        display: fv.isAdvancedOptionsHidden
          ? "hidden"
          : fv.isAdvancedOptionsExpanded
          ? "expanded"
          : "collapsed",
      },
      tokenWhiteList: fv.tokenWhitelist.map((option) => option.value),
    };
    dispatch(updateWidgetConfig(newConfig));
  };

  const { handleSubmit, reset: hookFormReset } = methods;

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(submit)}
        onReset={(e) => {
          e.preventDefault();
          hookFormReset();
        }}
      />
    </FormProvider>
  );
}

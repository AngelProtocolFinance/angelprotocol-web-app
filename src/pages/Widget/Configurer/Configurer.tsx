import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { resetWidgetConfig, updateWidgetConfig } from "slices/widget";
import { useSetter } from "store/accessors";
import { WidgetConfig } from "types/widget";
import Form from "./Form";
import { schema } from "./schema";
import { FormValues } from "./types";

export default function Configurer({ classes = "" }) {
  const dispatch = useSetter();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      endowment: { id: 0, name: "" },
      liquidPercentage: 50,
    },
  });

  const submit: SubmitHandler<FormValues> = async (fv) => {
    const newConfig: WidgetConfig = {
      endowment: fv.endowment,
      liquidSplitPct: fv.liquidPercentage,
    };
    dispatch(updateWidgetConfig(newConfig));
  };

  const { handleSubmit, reset: hookFormReset } = methods;

  return (
    <FormProvider {...methods}>
      <div className={classes + " @container/configurer"}>
        <h2 className="text-lg @4xl/widget:text-2xl text-center @4xl/widget:text-left mb-3">
          Donation Form Builder
        </h2>
        <Form
          onSubmit={handleSubmit(submit)}
          onReset={(e) => {
            e.preventDefault();
            dispatch(resetWidgetConfig());
            hookFormReset();
          }}
        />
      </div>
    </FormProvider>
  );
}

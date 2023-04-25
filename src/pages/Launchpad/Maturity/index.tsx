import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { mixed, object, string, date as yupDate } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { dateToFormFormat } from "components/form";
import { useLaunchpad } from "slices/launchpad";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

export default withStepGuard<4>(function Maturity({ data }) {
  const { update } = useLaunchpad(4);
  const methods = useForm<FV>({
    resolver: yupResolver(
      object().shape<SchemaShape<FV>>({
        date: mixed().when("willMature", {
          is: true,
          then: yupDate()
            .typeError("invalid date")
            .min(new Date(), "must be in the future"),
          otherwise: string(),
        }),
      })
    ),
    defaultValues: data
      ? {
          ...data,
          //date is valid date-string, when data.willMature is true
          date: data.willMature ? dateToFormFormat(new Date(data.date)) : "",
        }
      : {
          date: "",
          beneficiaries: [],
          willMature: false,
        },
  });

  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(({ date, ...data }) =>
          update({
            ...data,
            date: data.willMature ? new Date(date).toISOString() : "",
          })
        )}
      />
    </FormProvider>
  );
});

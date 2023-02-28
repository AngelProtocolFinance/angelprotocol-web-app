import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { object } from "yup";
import { FV } from "./types";
import { SchemaShape } from "schemas/types";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

export default withStepGuard<4>(function Maturity({ data }) {
  const methods = useForm<FV>({
    resolver: yupResolver(object().shape<SchemaShape<FV>>({})),
    defaultValues: {
      beneficiaries: [
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", share: 13 },
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", share: 20 },
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", share: 21 },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
});

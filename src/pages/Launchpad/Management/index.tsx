import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { TManagement } from "slices/launchpad/types";
import { withStepGuard } from "../withStepGuard";
import Form from "./Form";

type Props = {
  data: TManagement | undefined;
};

const Management: FC<Props> = (props) => {
  const methods = useForm({
    defaultValues: {
      members: [
        { addr: "juno1akkesf6xfuny3upfaq6yfvefzfr8jt2jfhvlw2", weight: 1 },
      ],
    },
  });

  return (
    <FormProvider {...methods}>
      <Form />
    </FormProvider>
  );
};

export default withStepGuard<2>(Management);

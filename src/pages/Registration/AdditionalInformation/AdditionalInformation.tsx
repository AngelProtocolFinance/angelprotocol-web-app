import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import ButtonSection from "./ButtonSection";
import { FormValues, SCHEMA } from "./types";
import WebsiteInput from "./WebsiteInput";

export default function AdditionalInformation() {
  const methods = useForm<FormValues>({
    resolver: yupResolver(SCHEMA),
    defaultValues: {
      website: "",
      logo: [],
    },
  });

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />

      <FormProvider {...methods}>
        <form
          className="flex flex-col w-full h-full gap-4 items-center"
          onSubmit={methods.handleSubmit(() => console.log("Upload"))}
        >
          <WebsiteInput />

          <ButtonSection />
        </form>
      </FormProvider>
    </div>
  );
}

function Title() {
  return (
    <h2 className="flex text-lg xl:text-xl font-semibold gap-2 items-center">
      Your logo and description will be used to populate your public profile
    </h2>
  );
}

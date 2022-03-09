import { FormProvider, useForm } from "react-hook-form";
import ButtonSection from "./ButtonSection";

export default function AdditionalInformation() {
  const methods = useForm({
    // resolver: yupResolver(ContactInfoSchema),
    // defaultValues: {
    //   charityName: props.contactData?.CharityName || "",
    //   firstName: props.contactData?.FirstName || "",
    //   lastName: props.contactData?.LastName || "",
    //   email: props.contactData?.Email || "",
    //   phone: props.contactData?.PhoneNumber || "",
    //   orgRole: props.contactData?.Role || UserRoles.ceo,
    //   otherRole: props.contactData?.otherRole || "",
    //   checkedPolicy: false,
    //   uniqueID: props.contactData?.PK || "",
    // },
  });

  return (
    <div className="flex flex-col gap-5 items-center">
      <Title />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => console.log("Upload"))}>
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

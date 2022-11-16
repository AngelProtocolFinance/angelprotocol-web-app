import { FormValues } from "../types";
import { useRegState } from "services/aws/registration/StepGuard";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import InputColumn from "../../../common/InputColumn";
import ButtonSection from "../ButtonSection";
import { VALID_MIME_TYPES } from "../schema";
import useSubmit from "./useSubmit";

export default function Form() {
  const {
    data: { contact },
  } = useRegState<3>();
  const submit = useSubmit();

  return (
    <form
      className="flex flex-col justify-center w-5/6 h-full gap-10 padded-container pt-10"
      onSubmit={submit}
    >
      <h2 className="flex text-lg xl:text-xl font-semibold gap-2 items-center">
        Your logo and description will be used to populate your public profile
      </h2>

      <InputColumn htmlFor="name" label="Name of your organization">
        <span className="flex w-full font-bold">{contact.orgName}</span>
      </InputColumn>
      <InputColumn
        htmlFor="banner"
        label="Banner image of your organization"
        required
      >
        <div className="flex flex-col gap-2">
          <ImgEditor<FormValues, "banner">
            name="banner"
            aspect={[4, 1]}
            accept={VALID_MIME_TYPES}
            classes="w-[20rem] sm:w-[40rem] aspect-[4/1] border-2 border-white/20 rounded-md"
          />
          <ImageSizeInfo limit="1MB" />
        </div>
      </InputColumn>
      <InputColumn htmlFor="logo" label="Logo of your organization" required>
        <div className="flex flex-col gap-2">
          <ImgEditor<FormValues, "logo">
            name="logo"
            aspect={[1, 1]}
            accept={VALID_MIME_TYPES}
            classes="sm:h-40 w-20 sm:w-40 aspect-[1/1] border-2 border-white/20 rounded-md"
          />
          <ImageSizeInfo limit="1MB" />
        </div>
      </InputColumn>
      <InputColumn
        htmlFor="overview"
        label="Description of your organization"
        required
      >
        <RichTextEditor<FormValues>
          fieldName="overview"
          classes={{
            container:
              "text-white/80 p-3 rounded-md bg-white/10 shadow-inner w-full text-left",
            error: "text-sm text-red ml-1",
          }}
          placeHolder="an overview of your organization"
        />
      </InputColumn>
      <ButtonSection />
    </form>
  );
}

const ImageSizeInfo = ({ limit }: { limit: string }) => (
  <p className="text-xs text-left font-thin text-white/70">
    should be less than {limit}
  </p>
);

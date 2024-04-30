import { yupResolver } from "@hookform/resolvers/yup";
import Group from "components/Group";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Label } from "components/form";
import { Form as FormWithContext } from "components/form";
import { adminRoutes } from "constants/routes";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Milestones from "./Milestones";
import {
  MAX_CHARS,
  MAX_SIZE_IN_BYTES,
  VALID_MIME_TYPES,
  schema,
} from "./schema";
import { FV } from "./types";
import useSubmit from "./useSubmit";

export default function Form() {
  const methods = useForm<FV>({
    defaultValues: {
      title: "",
      description: "",
      image: { publicUrl: "", preview: "" },
      milestones: [],
    },
    resolver: yupResolver(schema),
  });
  const { isSubmitting, submit } = useSubmit(methods);
  return (
    <FormWithContext
      methods={methods}
      onSubmit={submit}
      className="@container w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6"
    >
      <Group title="Program information">
        <Field<FV>
          classes="field-admin"
          name="title"
          label="Title of program"
          required
        />
        <Label className="-mb-4">Banner image of program</Label>
        <ImgEditor<FV, "image">
          name="image"
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{ container: "mb-4", dropzone: "w-full aspect-[4/1]" }}
          maxSize={MAX_SIZE_IN_BYTES}
        />

        <Label className="-mb-4" required>
          Description of program
        </Label>
        <RichTextEditor<FV>
          fieldName="description"
          charLimit={MAX_CHARS}
          classes={{
            container:
              "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-navy-l1 dark:text-navy-l2",
          }}
        />
      </Group>

      <Milestones />

      <div className="flex gap-3 group-disabled:hidden">
        <Link
          to={"../" + adminRoutes.programs}
          className="px-6 btn-outline-filled text-sm"
        >
          Cancel
        </Link>

        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 btn-blue text-sm"
        >
          Create program
        </button>
      </div>
    </FormWithContext>
  );
}
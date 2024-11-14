import type { Program } from "@better-giving/endowment";
import { yupResolver } from "@hookform/resolvers/yup";
import Group from "components/Group";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Label, RhfForm } from "components/form";
import { useForm } from "react-hook-form";
import { MAX_CHARS, MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";
import { schema } from "./schema";
import type { FV } from "./types";
import useSubmit from "./useSubmit";

export default function ProgramInfo(props: Program) {
  const methods = useForm<FV>({
    values: {
      title: props.title,
      image: {
        name: "",
        publicUrl: props.banner ?? "",
        preview: props.banner ?? "",
      },
      description: { value: props.description },
      targetRaise: props.targetRaise?.toString() ?? "",
    },
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;

  const submit = useSubmit(props);

  return (
    <Group title="Program information">
      <RhfForm
        onSubmit={handleSubmit(submit)}
        methods={methods}
        disabled={isSubmitting}
        className="contents"
      >
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
            field:
              "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            counter: "text-navy-l1 dark:text-navy-l2",
          }}
        />
        <Field<FV>
          classes="field-admin mb-4"
          name="targetRaise"
          label="Target amount to raise (USD)"
          placeholder="e.g. $1000"
        />
        <button
          disabled={!isDirty}
          type="submit"
          className="@lg:justify-self-end btn-blue py-2 text-sm"
        >
          Save changes
        </button>
      </RhfForm>
    </Group>
  );
}

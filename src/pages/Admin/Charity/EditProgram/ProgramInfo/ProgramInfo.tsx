import { yupResolver } from "@hookform/resolvers/yup";
import Group from "components/Group";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Form, Label } from "components/form";
import { useForm } from "react-hook-form";
import { Program } from "types/aws";
import { MAX_CHARS, MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";
import { schema } from "./schema";
import { FV } from "./types";
import useSubmit from "./useSubmit";

export default function ProgramInfo(props: Program) {
  const methods = useForm<FV>({
    defaultValues: props,
    resolver: yupResolver(schema),
  });
  const { submit, isSubmitting } = useSubmit(methods, props);
  return (
    <Group title="Program information">
      <Form onSubmit={submit} methods={methods} disabled={isSubmitting}>
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
      </Form>
    </Group>
  );
}

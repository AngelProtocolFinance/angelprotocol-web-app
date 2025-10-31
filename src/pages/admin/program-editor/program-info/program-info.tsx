import type { IProgram } from "@better-giving/endowment";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { Field, Form, Label } from "components/form";
import { Group } from "components/group";
import { ImgEditor } from "components/img-editor";
import { RichText } from "components/rich-text";
import { useController, useForm } from "react-hook-form";
import { MAX_CHARS, img_spec } from "../common";
import { type FV, schema } from "./schema";
import useSubmit from "./use-submit";

export function ProgramInfo(props: IProgram) {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors, dirtyFields },
    trigger,
    resetField,
    control,
  } = useForm<FV>({
    values: {
      title: props.title,
      image: props.banner ?? "",
      description: { value: props.description },
      target_raise: props.targetRaise?.toString() ?? "",
    },
    resolver: valibotResolver(schema),
  });
  const { field: image } = useController({ name: "image", control });
  const { field: desc } = useController({
    name: "description",
    control,
  });

  const { submit, is_loading } = useSubmit(dirtyFields);

  return (
    <Group title="Program information">
      <Form
        onSubmit={handleSubmit(submit)}
        disabled={isSubmitting}
        className="contents"
      >
        <Field
          {...register("title")}
          label="Title of program"
          required
          error={errors.title?.message}
        />
        <Label className="-mb-4">Banner image of program</Label>
        <ImgEditor
          value={image.value}
          on_change={(v) => {
            image.onChange(v);
            trigger("image");
          }}
          on_undo={(e) => {
            e.stopPropagation();
            resetField("image");
          }}
          spec={img_spec([4, 1])}
          classes={{ container: "mb-4", dropzone: "w-full aspect-4/1" }}
          error={errors.image?.message}
        />

        <Label className="-mb-4" required>
          Description of program
        </Label>
        <RichText
          content={desc.value}
          onChange={desc.onChange}
          ref={desc.ref}
          charLimit={MAX_CHARS}
          classes={{
            field:
              "rich-text-toolbar border border-gray-l3 text-sm grid grid-rows-[auto_1fr] rounded-sm bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            counter: "text-gray dark:text-gray",
          }}
          error={
            errors.description?.value?.message ||
            errors.description?.length?.message
          }
        />
        <Field
          {...register("target_raise")}
          classes="mb-4"
          label="Target amount to raise (USD)"
          placeholder="e.g. $1000"
          error={errors.target_raise?.message}
        />
        <button
          disabled={
            !isDirty || is_loading || isSubmitting || image.value === "loading"
          }
          type="submit"
          className="@lg:justify-self-end btn btn-blue py-2 text-sm"
        >
          {is_loading || isSubmitting ? "Saving..." : "Save changes"}
        </button>
      </Form>
    </Group>
  );
}

import { Disclosure } from "@headlessui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DrawerIcon } from "components/Icon";
import ImgEditor from "components/ImgEditor/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Form, Label, dateToFormFormat } from "components/form";
import { useForm } from "react-hook-form";
import type { Milestone as TMilestone } from "types/aws";
import { MAX_CHARS, MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "../common";
import { schema } from "./schema";
import type { FV } from "./types";
import useMustate from "./useMutate";

type Props = TMilestone & { programId: string };
export default function Milestone(props: Props) {
  const methods = useForm<FV>({
    values: {
      date: dateToFormFormat(new Date()),
      title: props.title,
      media: {
        name: "",
        publicUrl: props.media ?? "",
        preview: props.media ?? "",
      },
      description: { value: props.description ?? "" },
    },
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isDirty },
  } = methods;
  const { submit, handleDeleteMilestone, isDeletingMilestone } = useMustate(
    props.id,
    props.programId
  );

  return (
    <Disclosure
      as="div"
      className="border border-gray-l4 rounded overflow-hidden"
    >
      <div className="relative py-3 px-4 text-center bg-blue-l5 dark:bg-blue-d7">
        <span className="text-xl font-bold font-heading">{props.title}</span>
        <Disclosure.Button className="absolute right-4 top-1/2 -translate-y-1/2">
          {({ open }) => <DrawerIcon isOpen={open} size={24} />}
        </Disclosure.Button>
      </div>

      <Disclosure.Panel
        as={Form}
        className={({ open }) =>
          `${
            open ? "border-t border-gray-l4" : ""
          } bg-white dark:bg-blue-d6 py-6 px-4 grid content-start gap-6`
        }
        disabled={isSubmitting}
        onSubmit={handleSubmit(submit)}
        methods={methods}
      >
        <Label className="-mb-4">Image of milestone</Label>
        <ImgEditor<FV, "media">
          // resolved T[Path<T>] does not equal to ImgLink though it is the same ??
          name="media"
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{
            container: "mb-4",
            dropzone: "w-full @md:aspect-[4/1] h-36 @md:h-auto",
          }}
          maxSize={MAX_SIZE_IN_BYTES}
        />
        <Field<FV, "date">
          type="date"
          classes={{ input: "date-input uppercase", container: "field-admin" }}
          name="date"
          label="Date of milestone"
          placeholder="e.g. 2014-09-23"
          required
        />
        <Field<FV>
          classes="field-admin"
          name="title"
          label="Title of milestone"
          placeholder="e.g. John"
          required
        />
        <Label className="-mb-4">Description of milestone</Label>
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
        <div className="mt-2 flex gap-2 flex-col @lg:flex-row justify-between">
          <button
            disabled={isDeletingMilestone}
            type="button"
            className="btn-red py-2 text-sm"
            onClick={() => handleDeleteMilestone(props.id)}
          >
            {isDeletingMilestone ? "Deleting.." : "Delete"} milestone
          </button>
          <button
            disabled={!isDirty}
            type="submit"
            className="btn-blue py-2 text-sm"
          >
            Save changes
          </button>
        </div>
      </Disclosure.Panel>
    </Disclosure>
  );
}

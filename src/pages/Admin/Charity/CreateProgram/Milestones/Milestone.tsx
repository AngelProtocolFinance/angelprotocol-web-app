import { Disclosure } from "@headlessui/react";
import { Path, useFormContext } from "react-hook-form";
import { FV, FormMilestone } from "../types";
import { DrawerIcon } from "components/Icon";
import ImgEditor from "components/ImgEditor/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Label } from "components/form";
import { MAX_CHARS, VALID_MIME_TYPES } from "../schema";

export default function Milestone({
  idx,
  onRemove,
}: FormMilestone & { onRemove(idx: number): void }) {
  const { watch } = useFormContext<FV>();
  const mediaName: Path<FV> = `milestones.${idx}.milestone_media`;
  const title = watch(`milestones.${idx}.milestone_title`);
  return (
    <Disclosure
      as="div"
      className="border border-prim rounded dark:bg-blue-d7 overflow-hidden"
    >
      <div className="relative py-3 px-4 text-center">
        <span className="text-xl font-bold font-heading">
          {title || `Milestone ${idx + 1}`}
        </span>
        <Disclosure.Button className="absolute right-4 top-1/2 -translate-y-1/2">
          {({ open }) => <DrawerIcon isOpen={open} size={24} />}
        </Disclosure.Button>
      </div>

      <Disclosure.Panel
        as="div"
        className={({ open }) =>
          `${
            open ? "border-t border-prim" : ""
          } dark:bg-blue-d5 py-6 px-4 grid content-start gap-6`
        }
      >
        <Label className="-mb-4">Image of milestone</Label>
        <ImgEditor<FV, typeof mediaName>
          // resolved T[Path<T>] does not equal to ImgLink though it is the same ??
          name={mediaName as never}
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{ container: "mb-4", dropzone: "w-full aspect-[4/1]" }}
        />
        <Field<FV, "date">
          type="date"
          classes={{ input: "date-input uppercase" }}
          name={`milestones.${idx}.milestone_date`}
          label="Date of milestone"
          placeholder="e.g. John"
          required
        />
        <Field<FV>
          classes="field-admin"
          name={`milestones.${idx}.milestone_title`}
          label="Title of milestone"
          placeholder="e.g. John"
          required
        />
        <Label className="-mb-4" required>
          Description of milestone
        </Label>
        <RichTextEditor<FV>
          fieldName={`milestones.${idx}.milestone_description`}
          charLimit={MAX_CHARS}
          classes={{
            container:
              "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-gray-d1 dark:text-gray",
          }}
        />
        <button
          type="button"
          className="btn-outline-filled justify-self-end"
          onClick={() => onRemove(idx)}
        >
          Delete milestone
        </button>
      </Disclosure.Panel>
    </Disclosure>
  );
}

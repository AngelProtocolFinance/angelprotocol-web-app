import { Disclosure } from "@headlessui/react";
import { DrawerIcon } from "components/Icon";
import ImgEditor from "components/ImgEditor/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Label } from "components/form";
import { Path, useFormContext } from "react-hook-form";
import { MAX_CHARS, VALID_MIME_TYPES } from "../schema";
import { FV, FormMilestone } from "../types";

export default function Milestone({
  idx,
  onRemove,
}: FormMilestone & { onRemove(idx: number): void }) {
  const {
    watch,
    formState: { errors },
  } = useFormContext<FV>();
  const mediaName: Path<FV> = `milestones.${idx}.milestone_media`;
  const title = watch(`milestones.${idx}.milestone_title`);

  const milestoneError = errors.milestones?.[idx];

  return (
    <Disclosure
      as="div"
      className={`border ${
        //helps distinguish erroneous milestone just in case user collapses dropdown with errors left
        milestoneError ? "border-red" : "border-gray-l4"
      } rounded overflow-hidden`}
    >
      <div className="relative py-3 px-4 text-center bg-orange-l6 dark:bg-blue-d7">
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
            open ? "border-t border-gray-l4" : ""
          } bg-white dark:bg-blue-d6 py-6 px-4 grid content-start gap-6`
        }
      >
        <Label className="-mb-4">Image of milestone</Label>
        <ImgEditor<FV, typeof mediaName>
          // resolved T[Path<T>] does not equal to ImgLink though it is the same ??
          name={mediaName}
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{
            container: "mb-4",
            dropzone: "w-full @md:aspect-[4/1] h-36 @md:h-auto",
          }}
        />
        <Field<FV, "date">
          type="date"
          classes={{ input: "date-input uppercase", container: "field-admin" }}
          name={`milestones.${idx}.milestone_date`}
          label="Date of milestone"
          placeholder="e.g. 2014-09-23"
          required
        />
        <Field<FV>
          classes="field-admin"
          name={`milestones.${idx}.milestone_title`}
          label="Title of milestone"
          placeholder="e.g. John"
          required
        />
        <Label className="-mb-4">Description of milestone</Label>
        <RichTextEditor<FV>
          fieldName={`milestones.${idx}.milestone_description`}
          charLimit={MAX_CHARS}
          classes={{
            container:
              "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-navy-l1 dark:text-gray",
          }}
        />
        <button
          type="button"
          className="btn-outline-filled @md:justify-self-end w-full @lg:w-52 py-2 text-sm"
          onClick={() => onRemove(idx)}
        >
          Delete milestone
        </button>
      </Disclosure.Panel>
    </Disclosure>
  );
}

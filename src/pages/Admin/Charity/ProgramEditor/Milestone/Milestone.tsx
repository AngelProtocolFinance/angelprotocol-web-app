import type {
  MilestoneUpdate,
  Milestone as TMilestone,
} from "@better-giving/endowment";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useFetcher } from "@remix-run/react";
import { DrawerIcon } from "components/Icon";
import { ControlledImgEditor as ImgEditor } from "components/ImgEditor";
import { RichText } from "components/RichText";
import {
  NativeField as Field,
  Form,
  Label,
  dateToFormFormat,
} from "components/form";
import { useController, useForm } from "react-hook-form";
import { MAX_CHARS, imgSpec } from "../common";
import { type FV, schema } from "./schema";

type Props = TMilestone & { programId: string };
export default function Milestone(props: Props) {
  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
    control,
    trigger,
    resetField,
  } = useForm<FV>({
    values: {
      date: dateToFormFormat(new Date(props.date)),
      title: props.title,
      media: props.media ?? "",
      description: { value: props.description ?? "" },
    },
    resolver: valibotResolver(schema),
  });

  const { field: desc } = useController({ control, name: "description" });
  const { field: media } = useController({ control, name: "media" });

  const fetcher = useFetcher();

  return (
    <Disclosure
      as="div"
      className="border border-gray-l4 rounded-sm overflow-hidden"
    >
      <div className="relative py-3 px-4 text-center bg-blue-l5 dark:bg-blue-d7">
        <span className="text-xl font-bold font-heading">{props.title}</span>
        <DisclosureButton className="absolute right-4 top-1/2 -translate-y-1/2">
          {({ open }) => <DrawerIcon isOpen={open} size={20} />}
        </DisclosureButton>
      </div>

      <DisclosurePanel
        as={Form}
        className={({ open }) =>
          `${
            open ? "border-t border-gray-l4" : ""
          } bg-white dark:bg-blue-d6 py-6 px-4 grid content-start gap-6`
        }
        disabled={isSubmitting}
        onSubmit={handleSubmit((fv) => {
          const update: MilestoneUpdate = {
            description: fv.description.value,
            title: fv.title,
            date: new Date(fv.date).toISOString(),
            ...(fv.media && { media: fv.media }),
          };
          fetcher.submit(
            { ...update, intent: "edit-milestone", "milestone-id": props.id },
            {
              encType: "application/json",
              method: "POST",
              action: ".",
            }
          );
        })}
      >
        <Label className="-mb-4">Image of milestone</Label>
        <ImgEditor
          value={media.value}
          onChange={(v) => {
            media.onChange(v);
            trigger("media");
          }}
          onUndo={(e) => {
            e.stopPropagation();
            resetField("media");
          }}
          spec={imgSpec([4, 1])}
          classes={{
            container: "mb-4",
            dropzone: "w-full @-md:aspect-4/1 h-36 @md:h-auto",
          }}
          error={errors.media?.message}
        />
        <Field
          {...register("date")}
          type="date"
          classes={{ input: "date-input uppercase", container: "field-admin" }}
          label="Date of milestone"
          placeholder="e.g. 2014-09-23"
          required
          error={errors.date?.message}
        />
        <Field
          {...register("title")}
          classes="field-admin"
          label="Title of milestone"
          placeholder="e.g. John"
          required
          error={errors.title?.message}
        />
        <Label className="-mb-4">Description of milestone</Label>
        <RichText
          content={desc.value}
          onChange={desc.onChange}
          ref={desc.ref}
          charLimit={MAX_CHARS}
          classes={{
            field:
              "rich-text-toolbar border border-gray-l4 text-sm grid grid-rows-[auto_1fr] rounded-sm bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            counter: "text-navy-l1 dark:text-navy-l2",
          }}
          error={
            errors.description?.value?.message ||
            errors.description?.length?.message
          }
        />
        <div className="mt-2 flex gap-2 flex-col @lg:flex-row justify-between">
          <button
            disabled={fetcher.state !== "idle"}
            type="button"
            className="btn-red py-2 text-sm"
            onClick={() => {
              if (!window.confirm("Delete milestone?")) return;
              fetcher.submit(
                { intent: "delete-milestone", "milestone-id": props.id },
                { method: "POST", encType: "application/json" }
              );
            }}
          >
            {fetcher.formData?.get("intent") === "delete-milestone" &&
            fetcher.state !== "idle"
              ? "Deleting.."
              : "Delete"}{" "}
            milestone
          </button>
          <button
            disabled={
              !isDirty || fetcher.state !== "idle" || media.value === "loading"
            }
            type="submit"
            className="btn-blue py-2 text-sm"
          >
            Save changes
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}

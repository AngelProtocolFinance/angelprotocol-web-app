import Group from "components/Group";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Label } from "components/form";
import { adminRoutes } from "constants/routes";
import { Link } from "react-router-dom";
import Milestones from "./Milestones";
import { MAX_CHARS, VALID_MIME_TYPES } from "./schema";
import { FV } from "./types";
import useSubmit from "./useSubmit";

export default function Form() {
  const { isSubmitting, submit, reset, initial } = useSubmit();
  return (
    <form
      onSubmit={submit}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className="@container w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6 font-body"
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
        />

        <Label className="-mb-4" required>
          Description of program
        </Label>
        <RichTextEditor<FV>
          fieldName="description"
          charLimit={MAX_CHARS}
          classes={{
            container:
              "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_1fr] rounded bg-gray-l6 dark:bg-blue-d5 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-gray-d1 dark:text-gray",
          }}
        />
      </Group>

      <Milestones />

      <div className="flex gap-3 group-disabled:hidden">
        {initial ? (
          <button
            disabled={isSubmitting}
            type="reset"
            className="px-6 btn-outline-filled text-sm"
          >
            Reset changes
          </button>
        ) : (
          <Link
            to={`../${adminRoutes.programs}`}
            className="px-6 btn-outline-filled text-sm"
          >
            Cancel
          </Link>
        )}
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 btn-orange text-sm"
        >
          {initial ? "Submit changes" : "Create program"}
        </button>
      </div>
    </form>
  );
}

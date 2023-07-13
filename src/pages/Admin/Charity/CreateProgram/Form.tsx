import { FormHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { FV } from "./types";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Tooltip } from "components/admin";
import { Field, Label } from "components/form";
import { appRoutes } from "constants/routes";
import Group from "./common/Group";
import { VALID_MIME_TYPES } from "./schema";
import useEditProfile from "./useSubmit";

export default function Form({
  tooltip,
}: FormHTMLAttributes<HTMLFormElement> & { tooltip?: string }) {
  const { isSubmitting, id } = useEditProfile();
  return (
    <fieldset
      disabled={!!tooltip}
      className="group w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6 font-body"
    >
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="text-blue hover:text-orange text-sm flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      {tooltip && <Tooltip tooltip={tooltip} />}
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
          charLimit={500}
          classes={{
            container:
              "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_1fr] rounded bg-orange-l6 dark:bg-blue-d7 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-gray-d1 dark:text-gray",
          }}
        />
      </Group>

      <div className="flex gap-3 group-disabled:hidden">
        <button
          disabled={isSubmitting}
          type="reset"
          className="px-6 btn-outline-filled text-sm"
        >
          Reset changes
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 btn-orange text-sm"
        >
          Submit changes
        </button>
      </div>
    </fieldset>
  );
}

import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { FormValues as FV } from "./types";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Field, Label } from "components/form";
import { appRoutes } from "constants/routes";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "./schema";
import useEditProfile from "./useEditProfile";

export default function Form() {
  const { editProfile, isSubmitting, id, reset } = useEditProfile();
  return (
    <form
      onSubmit={editProfile}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6 font-body"
    >
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="text-blue hover:text-orange text-sm flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      <Group
        title="Public profile information"
        description="The following information will be used to populate your public
          profile."
      >
        <Field<FV>
          classes="field-admin"
          name="name"
          label="Name of your organization"
          required
        />
        <Field<FV>
          classes="field-admin"
          name="tagline"
          label="Tagline of your organization"
          required
        />
        <Label className="-mb-4" required>
          Banner
        </Label>
        <ImgEditor<FV, "image">
          name="image"
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{ container: "mb-4", dropzone: "w-full aspect-[4/1]" }}
        />
        <Label className="-mb-4" required>
          Logo
        </Label>
        <ImgEditor<FV, "logo">
          name="logo"
          accept={VALID_MIME_TYPES}
          aspect={[1, 1]}
          classes={{
            container: "mb-4",
            dropzone: "w-28 sm:w-48 aspect-square",
          }}
          maxSize={MAX_SIZE_IN_BYTES}
        />
        <Label className="-mb-4" required>
          Description of your organization
        </Label>
        <RichTextEditor<FV>
          fieldName="overview"
          placeHolder="A short overview of your charity"
          charLimit={4000}
          classes={{
            container:
              "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_1fr] rounded bg-orange-l6 dark:bg-blue-d7 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-gray-d1 dark:text-gray",
          }}
        />
      </Group>

      <div className="flex gap-3">
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
    </form>
  );
}

function Group({
  description,
  ...props
}: PropsWithChildren<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="grid gap-6 p-6 border border-prim rounded">
      <h3 className="text-2xl font-body">{props.title}</h3>
      {description && (
        <p className="-mt-4 text-lg font-semibold">{description}</p>
      )}
      {props.children}
    </div>
  );
}

import { Link } from "react-router-dom";
import { ProfileFormValues as UV } from "pages/Admin/types";
import CountrySelector from "components/CountrySelector";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import {
  FormContainer,
  GroupContainer,
  Submitter,
  TextArea,
  TextPrim,
  TextSec,
  errorStyle,
} from "components/admin";
import { Label } from "components/form";
import { appRoutes } from "constants/routes";
import SDGSelector from "./SDGSelector";
import { VALID_MIME_TYPES } from "./schema";
import useEditForm from "./useEditProfile";

export default function Form() {
  const { editProfile, isSubmitDisabled, id } = useEditForm();
  return (
    <FormContainer
      onSubmit={editProfile}
      className="max-w-4xl justify-self-center mt-6"
    >
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="text-blue hover:text-orange text-sm flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      <TextPrim<UV> label="Proposal title" name="title" required />
      <TextArea<UV> label="Proposal description" name="description" required />
      <Label className="-mb-4">Banner</Label>
      <ImgEditor<UV, "image">
        name="image"
        accept={VALID_MIME_TYPES}
        aspect={[4, 1]}
        classes="w-full aspect-[4/1] mb-4 rounded border border-gray-l2 dark:border-bluegray"
      />
      <Label className="-mb-4">Logo</Label>
      <ImgEditor<UV, "logo">
        name="logo"
        accept={VALID_MIME_TYPES}
        aspect={[1, 1]}
        classes="w-28 sm:w-48 aspect-square mb-4 rounded border border-gray-l2 dark:border-bluegray"
      />
      <Label className="-mb-4">SDG#</Label>
      <SDGSelector />
      <TextPrim<UV> name="name" label="Charity Name" />
      <TextPrim<UV> name="registration_number" label="Registration number" />
      <TextPrim<UV> name="street_address" label="Street address" />
      <Label className="-mb-4">Country</Label>
      <CountrySelector<UV, "country">
        fieldName="country"
        classes={{
          container:
            "px-4 border border-gray-l2 rounded focus-within:border-gray-d1 focus-within:dark:border-blue-l2 dark:border-bluegray bg-orange-l6 dark:bg-blue-d7",
          input:
            "text-sm py-3.5 w-full placeholder:text-sm placeholder:text-gray-d1 dark:placeholder:text-gray focus:outline-none bg-transparent",
          error: errorStyle,
        }}
      />
      <Label className="-mb-4">Overview</Label>
      <RichTextEditor<UV>
        fieldName="overview"
        placeHolder="A short overview of your charity"
        classes={{
          container:
            "rich-text-toolbar border border-gray-l2 dark:border-bluegray text-sm grid grid-rows-[auto_1fr] rounded bg-orange-l6 dark:bg-blue-d7 p-3",
          error: "text-right text-red dark:text-red-l1 text-xs -mt-4",
          charCounter: "text-gray-d1 dark:text-gray",
        }}
      />

      <Label className="-mb-4 font-bold">Social Media</Label>
      <GroupContainer>
        <TextSec<UV>
          name="url"
          label="Website"
          placeholder="https://website.org"
        />
        <TextSec<UV>
          name="facebook"
          label="Facebook"
          placeholder="https://facebook.com/"
        />
        <TextSec<UV>
          name="twitter"
          label="Twitter"
          placeholder="https://twitter.com/"
        />
        <TextSec<UV>
          name="linkedin"
          label="Linkedin"
          placeholder="https://linkedin.com/"
        />
      </GroupContainer>

      <TextPrim<UV>
        name="contact_email"
        label="Contact email"
        disabled={true}
      />

      <Submitter disabled={isSubmitDisabled} type="submit">
        Submit
      </Submitter>
    </FormContainer>
  );
}

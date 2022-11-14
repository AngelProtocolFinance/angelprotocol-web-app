import { Link } from "react-router-dom";
import { ProfileFormValues as UV } from "pages/Admin/types";
import CountrySelector from "components/CountrySelector";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import {
  FormContainer,
  GroupContainer,
  Label,
  Submitter,
  TextInput,
} from "components/admin";
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
        className="text-blue hover:text-blue-l2 text-sm font-semibold flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      <TextInput<UV> title="Proposal Title" name="title" required />
      <TextInput<UV>
        title="proposal description"
        name="description"
        wide
        required
      />
      <Label className="text-gray-d2 -mb-2">Banner</Label>
      <ImgEditor<UV, "image">
        name="image"
        accept={VALID_MIME_TYPES}
        aspect={[4, 1]}
        classes="w-full aspect-[4/1] mb-4 shadow-inner-white bg-gray-l2 rounded-md"
      />
      <Label className="text-gray-d2 -mb-2">SDG#</Label>
      <SDGSelector />
      <TextInput<UV>
        name="name"
        title="Charity Name"
        placeholder="The charitable charity"
      />
      <TextInput<UV>
        name="registration_number"
        title="Registration number"
        placeholder="AP2022HLO"
      />
      <TextInput<UV>
        name="street_address"
        title="Street address"
        placeholder="Manila, Philippines"
      />
      <Label className="text-gray-d2 -mb-2">Country</Label>
      <CountrySelector<UV, "country">
        fieldName="country"
        classes={{
          container: "bg-gray-l4 shadow-inner-white rounded-md p-3",
          input: "bg-transparent",
          error:
            "absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2",
        }}
      />
      <Label className="text-gray-d2 -mb-2">Overview</Label>
      <RichTextEditor<UV>
        fieldName="overview"
        placeHolder="a short overview of your charity"
        classes={{
          container:
            "toolbar-icons-dark grid grid-rows-[auto_1fr] rounded-md bg-gray-l4 shadow-inner-white p-3",
          error:
            "font-mono font-semibold text-right text-red-l1 text-xs m-1 -mt-3",
          charCounter: "text-gray-d2",
        }}
      />

      <Label className="text-gray-d2 -mb-2">Organization</Label>
      <GroupContainer>
        <TextInput<UV>
          name="number_of_employees"
          title="Number of employeees"
          placeholder="50 - 100"
          plain
        />
        <TextInput<UV>
          name="charity_navigator_rating"
          title="Navigator rating"
          placeholder="Platinum"
          plain
        />
      </GroupContainer>

      <Label className="text-gray-d2 -mb-2">Social Media</Label>
      <GroupContainer>
        <TextInput<UV>
          name="url"
          title="Website"
          placeholder="https://website.org"
          plain
        />
        <TextInput<UV>
          name="facebook"
          title="Facebook"
          placeholder="https://facebook.com/angelprotocol"
          plain
        />
        <TextInput<UV>
          name="twitter"
          title="Twitter"
          placeholder="https://twitter.com/angelprotocol"
          plain
        />
        <TextInput<UV>
          name="linkedin"
          title="Linkedin"
          placeholder="https://linkedin.com/angelprotocol"
          plain
        />
      </GroupContainer>

      <TextInput<UV>
        name="contact_email"
        title="Contact email"
        placeholder="hello@angelprotocol.io"
      />

      <Submitter disabled={isSubmitDisabled} type="submit">
        Submit
      </Submitter>
    </FormContainer>
  );
}

import { Link } from "react-router-dom";
import { ProfileFormValues as UV } from "pages/Admin/types";
import CountrySelector from "components/CountrySelector";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import RichTextEditor from "components/RichTextEditor";
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
        className="text-angel-blue hover:text-sky-300 text-sm font-semibold flex items-center gap-1"
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
      <Label className="text-angel-grey -mb-2">Banner</Label>
      <ImgEditor<UV>
        name="image"
        accept={VALID_MIME_TYPES}
        aspectRatioX={4}
        aspectRatioY={1}
        className="h-20 sm:h-40 w-[20rem] sm:w-[40rem]"
      />
      <Label className="text-angel-grey -mb-2">SDG#</Label>
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
      <Label className="text-angel-grey -mb-2">Country</Label>
      <CountrySelector<UV>
        fieldName="country_of_origin"
        classes={{
          container: "bg-light-grey shadow-inner-white-grey rounded-md p-3",
          input: "bg-transparent",
        }}
      />
      <Label className="text-angel-grey -mb-2">Overview</Label>
      <RichTextEditor<UV>
        fieldName="overview"
        placeHolder="a short overview of your charity"
        classes={{
          container:
            "toolbar-icons-dark grid grid-rows-[auto_1fr] rounded-md bg-light-grey shadow-inner-white-grey p-3",
          error:
            "font-mono font-semibold text-right text-red-400 text-xs m-1 -mt-3",
          charCounter: "text-angel-grey",
        }}
      />

      <Label className="text-angel-grey -mb-2">Organization</Label>
      <GroupContainer>
        <TextInput<UV>
          name="average_annual_budget"
          title="Annual budget"
          placeholder="$100,000"
          plain
        />
        <TextInput<UV>
          name="annual_revenue"
          title="Annual revenue"
          placeholder="$120,000"
          plain
        />
        <TextInput<UV>
          name="number_of_employees"
          title="Number of employeees"
          placeholder="50 - 100"
          plain
        />
      </GroupContainer>

      <Label className="text-angel-grey -mb-2">Social Media</Label>
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
        Submit proposal
      </Submitter>
    </FormContainer>
  );
}

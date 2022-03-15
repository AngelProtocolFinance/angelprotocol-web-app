import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import OverviewEditor from "./Editors/OverviewEditor/OverviewEditor";
import ImageEditor from "./Editors/ImageEditor/ImageEditor";
import SDGSelector from "./SDGSelector";
import TextInput, { PrependedInput } from "./TextInput";
import { site, app } from "types/routes";
import useEditForm from "./useEditForm";

export default function EditForm() {
  const { endowment_addr, updateProfile, isSubmitDisabled } = useEditForm();

  return (
    <form className="max-w-3xl w-full" onSubmit={updateProfile}>
      <Link
        to={`${site.app}/${app.charity}/${endowment_addr}`}
        className="flex items-center gap-1 font-heading uppercase font-bold text-md text-white hover:text-angel-orange mb-4"
      >
        <BiArrowBack size={15} /> back to profile
      </Link>

      <p className="text-xs font-heading font-semibold uppercase text-white text-opacity-100 mb-2">
        Banner
      </p>
      <ImageEditor />
      <SDGSelector />
      <TextInput
        id="charity_name"
        label="Charity Name"
        placeholder="The charitable charity"
      />
      <TextInput
        id="charity_registration_number"
        label="Registration number"
        placeholder="AP2022HLO"
      />
      <TextInput
        id="country_city_origin"
        label="Location"
        placeholder="Manila, Philippines"
      />
      <OverviewEditor />
      <SectionHeader title="Organization" />
      <TextInput
        id="average_annual_budget"
        label="Annual budget"
        placeholder="$100,000"
      />
      <TextInput
        id="annual_revenue"
        label="Annual revenue"
        placeholder="$120,000"
      />
      <TextInput
        id="number_of_employees"
        label="Number of employeees"
        placeholder="50 - 100"
      />
      <SectionHeader title="social media" />
      <PrependedInput
        id="facebook_page"
        label="Facebook"
        prependText="https://facebook.com/"
        placeholder="angelprotocol"
      />
      <PrependedInput
        id="twitter_handle"
        label="Twitter"
        prependText="https://twitter.com/"
        placeholder="@angelprotocol"
      />
      <PrependedInput
        id="linkedin_page"
        label="Linkedin"
        prependText="https://linkedin.com/"
        placeholder="angelprotocol"
      />
      <SectionHeader title="contact" />
      <TextInput
        id="charity_email"
        label="Email"
        placeholder="hello@angelprotocol.io"
      />
      <button
        disabled={isSubmitDisabled}
        type="submit"
        className="bg-angel-blue hover:bg-angel-orange disabled:bg-grey-accent rounded-md uppercase text-white-grey text-sm font-bold w-full p-4 mb-6"
      >
        save
      </button>
    </form>
  );
}

function SectionHeader(props: { title: string }) {
  return (
    <p className="font-heading text-xl font-bold text-white-grey mb-4 mt-12 uppercase">
      {props.title}
    </p>
  );
}

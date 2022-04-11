import { Link } from "react-router-dom";
import OverviewEditor from "./OverviewEditor/OverviewEditor";
import ImageEditor from "./ImageEditor/ImageEditor";
import SDGSelector from "./SDGSelector";
import { site, app } from "constants/routes";
import useEditForm from "./useEditProfile";
import Icon from "components/Icons/Icons";
import TextInput from "pages/Admin/components/TextInput";
import { UpdateProfileValues as UV } from "./profileEditSchema";

export default function EditForm() {
  const { endowment_addr, editProfile, isSubmitDisabled } = useEditForm();
  return (
    <form className="max-w-3xl w-full" onSubmit={editProfile}>
      <Link
        to={`${site.app}/${app.charity}/${endowment_addr}`}
        className="flex items-center gap-1 font-heading uppercase font-bold text-md text-white hover:text-angel-orange mb-4"
      >
        <Icon type="ArrowBack" size={15} /> back to profile
      </Link>

      <p className="text-xs font-heading font-semibold uppercase text-white/100 mb-2">
        Banner
      </p>
      <ImageEditor />
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
        name="country_city_origin"
        title="Location"
        placeholder="Manila, Philippines"
      />
      <OverviewEditor />
      <SectionHeader title="Organization" />
      <TextInput<UV>
        name="average_annual_budget"
        title="Annual budget"
        placeholder="$100,000"
      />
      <TextInput<UV>
        name="annual_revenue"
        title="Annual revenue"
        placeholder="$120,000"
      />
      <TextInput<UV>
        name="number_of_employees"
        title="Number of employeees"
        placeholder="50 - 100"
      />
      <SectionHeader title="social media" />
      <TextInput<UV>
        name="url"
        title="Website"
        placeholder="https://website.org"
      />
      <TextInput<UV>
        name="facebook"
        title="Facebook"
        placeholder="https://facebook.com/angelprotocol"
      />
      <TextInput<UV>
        name="facebook"
        title="Twitter"
        placeholder="https://twitter.com/angelprotocol"
      />
      <TextInput<UV>
        name="linkedin"
        title="Linkedin"
        placeholder="https://linkedin.com/angelprotocol"
      />
      <SectionHeader title="contact" />
      <TextInput<UV>
        name="contact_email"
        title="Contact email"
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

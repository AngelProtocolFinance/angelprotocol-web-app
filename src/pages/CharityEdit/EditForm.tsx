import OverviewEditor from "./Editors/OverviewEditor/OverviewEditor";
import ImageEditor from "./Editors/ImageEditor/ImageEditor";
import SDGSelector from "./SDGSelector";
import TextInput from "./TextInput";
import { Link, useRouteMatch } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { app } from "types/routes";

export default function EditForm() {
  return (
    <form className="max-w-3xl w-full">
      <div className="flex justify-between items-center mb-2">
        <Link
          to={`../${app.charity}/terra1grjzys0n9n9h9ytkwjsjv5mdhz7dzurdsmrj4v`}
          className="flex items-center gap-1 font-heading uppercase font-bold text-sm text-white hover:text-angel-orange mb-4"
        >
          <BiArrowBack size={15} /> back to profile
        </Link>
        <button
          type="button"
          className="px-6 py-2 bg-angel-blue hover:bg-angel-orange rounded-md uppercase text-white-grey text-sm font-bold"
        >
          save
        </button>
      </div>

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
      <TextInput
        id="facebook_page"
        label="Facebook"
        placeholder="https://facebook.com/angelprotocol"
      />
      <TextInput
        id="twitter_handle"
        label="Twitter"
        placeholder="https://twitter.com/angelprotocol"
      />
      <TextInput
        id="linkedin_page"
        label="Linkedin"
        placeholder="https://linkedin.com/angelprotocol"
      />
      <SectionHeader title="contact" />
      <TextInput
        id="charity_email"
        label="Email"
        placeholder="hello@angelprotocol.io"
      />
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

import { useEffect, useState } from "react";
import { Profile } from "@types-server/contracts";
import { CountryOption } from "components/CountrySelector/CountrySelector";
import { COUNTRIES_REST_ENDPOINT } from "constants/urls";

//toDO
export default function CharityStats(props: Profile & { classes?: string }) {
  const [countryName, setCountryName] = useState("");

  //get country name from country code
  useEffect(() => {
    if (!props.country_of_origin) return;
    fetch(
      `${COUNTRIES_REST_ENDPOINT}/alpha/${props.country_of_origin}?fields=name,cca2`
    )
      .then((res) => res.json())
      .then((country: CountryOption) => {
        setCountryName(country.name.common);
      });
  }, [props.country_of_origin]);

  return (
    <ul className={`${props.classes || ""} `}>
      <StatsItem title="Registration#" value={props.registration_number} />
      <StatsItem title="Address" value={props.street_address} />
      <StatsItem title="Country" value={countryName} />
      <StatsItem
        title="avg annual budget"
        value={props.average_annual_budget}
      />
      <StatsItem title="annual avg donations" value={props.annual_revenue} />
      <StatsItem title="no. of employees" value={props.number_of_employees} />
      <StatsItem
        title="navigator rating"
        classes="text-leaf-green"
        value={props.charity_navigator_rating}
      />
    </ul>
  );
}

function StatsItem(props: {
  title: string;
  value?: string | number;
  classes?: string;
}) {
  return (
    <li className="mb-4 rounded-md">
      <p className="text-white font-light text-xs tracking-wide uppercase">
        {props.title}
      </p>
      <p
        className={`text-white text-xl font-heading font-semibold capitalize break-words w-115 
        ${props.classes || ""}`}
      >
        {props.value || "N/A"}
      </p>
    </li>
  );
}

import { Profile } from "types/server/aws";

export default function CharityStats(props: Profile & { classes?: string }) {
  return (
    <ul className={`${props.classes || ""} `}>
      <StatsItem
        title="Registration#"
        value={props.charity_registration_number}
      />
      <StatsItem
        title="Address"
        value={
          "place holder street address" /**change when profile street & country is separated, country as country name */
        }
      />
      <StatsItem title="Country" value={"country name"} />
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

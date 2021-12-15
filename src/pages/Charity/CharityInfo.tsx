import useProfile from "pages/Market/useProfile";
import { useRouteMatch } from "react-router-dom";
import { CharityParam } from "./Charity";

export function CharityInfo() {
  const match = useRouteMatch<CharityParam>();
  const charity_addr = match.params.address;
  const profile = useProfile(charity_addr);
  return (
    <div className="leftbar overflow-y-auto">
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">headquarters</p>
        <span className="text-xl">{profile.country_city_origin}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">Annual Avg overhead</p>
        <span className="text-xl">{profile.average_annual_budget}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">Annual Avg donations</p>
        <span className="text-xl">{profile.annual_revenue}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm"># Of employees</p>
        <span className="text-xl">{profile.number_of_employees}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">navigator rating</p>
        <span className="text-xl text-leaf-green">
          {profile.charity_navigator_rating}
        </span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">impact rating</p>
        <span className="text-xl text-leaf-green">94/100</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">leadership rating</p>
        <span className="uppercase text-xl text-orange">comming soon</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">culture rating</p>
        <span className="uppercase text-xl text-orange">N/A</span>
      </div>
    </div>
  );
}

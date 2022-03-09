import { useParams } from "react-router-dom";
import { useProfileState } from "services/aws/endowments/states";
import { CharityParam } from "./types";

export function CharityInfo() {
  const { address: charity_addr } = useParams<CharityParam>();

  const { profileState } = useProfileState(charity_addr!);
  return (
    <div className="leftbar overflow-y-auto">
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">headquarters</p>
        <span className="text-xl">{profileState.country_city_origin}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">Annual Avg overhead</p>
        <span className="text-xl">{profileState.average_annual_budget}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">Annual Avg donations</p>
        <span className="text-xl">{profileState.annual_revenue}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm"># Of employees</p>
        <span className="text-xl">{profileState.number_of_employees}</span>
      </div>
      <div className="total-info-item mb-4">
        <p className="uppercase text-sm">navigator rating</p>
        <span className="text-xl text-leaf-green">
          {profileState.charity_navigator_rating}
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

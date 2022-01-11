import CharityCard from "pages/Market/CharityCard";
import React from "react";
import { Profile } from "services/aws/endowments/types";

type Props = {
  profiles: Profile[];
};

export default function CharitiesList({ profiles }: Props) {
  return (
    <div className="mt-8 text-white-grey flex flex-col items-center lg:items-start">
      <p className="uppercase text-2xl font-heading font-semibold mb-4">
        Charities in this index
      </p>
      <ul className="flex flex-wrap gap-4 justify-center">
        {profiles.map((profile) => (
          <div className="max-h-116 overflow-hidden">
            <CharityCard address={profile.endowment_address} />
          </div>
        ))}
      </ul>
    </div>
  );
}

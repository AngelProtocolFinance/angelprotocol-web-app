import CharityCard from "pages/Market/CharityCard";
import React from "react";
import { Profile } from "services/aws/endowments/types";

type Props = {
  profiles: Profile[];
};

export default function CharitiesList({ profiles }: Props) {
  return (
    <div className="mt-8 text-white-grey flex flex-col">
      <p className="uppercase text-2xl font-heading font-semibold mb-4">
        Charities in this index
      </p>
      <ul className="flex flex-row gap-4 overflow-x-auto">
        {profiles.map((profile) => (
          <CharityCard address={profile.endowment_address} />
        ))}
      </ul>
    </div>
  );
}

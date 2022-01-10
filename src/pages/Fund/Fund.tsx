import Action from "components/ActionButton/Action";
import Donater from "components/Donater/Donater";
import DappHead from "components/Headers/DappHead";
import { useSetModal } from "components/Nodal/Nodal";
import DonateSuite from "components/TransactionSuite/DonateSuite";
import { unsdgs } from "pages/Fund/unsdgs";
import CharityCard from "pages/Market/CharityCard";
import useProfiles from "pages/Market/useProfiles";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import FundVid from "./FundVid";
import Overview from "./Overview";
import ShareSection from "./ShareSection";

type FundProps = { fund_id: number };

function FundForm(props: FundProps) {
  return (
    <Donater to="fund" receiver={props.fund_id}>
      <DonateSuite inModal />
    </Donater>
  );
}

export default function Fund(props: RouteComponentProps<{ id?: string }>) {
  const [isSharing, setSharing] = useState(false);
  const { showModal } = useSetModal();

  const id_param = props.match.params?.id;
  const fund_id =
    //if user goes to fund page with param not in ["1"..."17"], set id to 1
    (id_param && sdg_ids.includes(id_param) && Number(id_param)) || 1;
  const profiles = useProfiles(fund_id);
  const sdg = unsdgs[fund_id];

  const showDonationForm = () => showModal(FundForm, { fund_id });
  const toggleShare = () => setSharing((prev) => !prev);

  return (
    <section className="grid content-start pb-24">
      <DappHead />
      <div className="grid grid-rows-fund grid-cols-1a container mx-auto gap-4">
        <div
          className={`col-start-1 col-span-1 ${sdg.bg} self-stretch grid grid-cols-a1 items-center rounded-xl shadow-md`}
        >
          <img src={sdg.icon} alt="" className="h-44 m-9" />
          <h1 className="text-5xl text-white uppercase font-bold ">
            <div className="mb-2">{`UNSDG#${fund_id}`}</div>
            <div>{sdg.title}</div>
          </h1>
        </div>
        <FundVid url={sdg.youtube} />
        <Overview fund_id={fund_id} />

        <div className="flex flex-col">
          <Action
            title="Donate"
            classes="bg-yellow-blue w-52 h-12"
            onClick={showDonationForm}
          />
          <div className="flex gap-5">
            <Action
              title="Share"
              classes="bg-angel-blue w-52 h-12"
              onClick={toggleShare}
            />
            <ShareSection isOpen={isSharing} />
          </div>
        </div>
      </div>
      <div className="mt-8 container mx-auto text-white-grey">
        <p className="uppercase text-2xl font-heading font-semibold mb-4">
          Charities in this index
        </p>
        <ul className="flex flex-wrap gap-4">
          {profiles.map((profile) => (
            <div className="max-h-116 overflow-hidden">
              <CharityCard address={profile.endowment_address} />
            </div>
          ))}
        </ul>
      </div>
    </section>
  );
}

//array of string id's to check route params against
const sdg_ids: string[] = Array(16)
  .fill(1)
  .map((el, idx) => `${el + idx}`);

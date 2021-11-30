import Donator from "components/Donator/Donator";
import UserForm from "components/Donator/UserForm";
// import { useState } from "react";
// import Modal from "react-modal";
// import { CharityInfo } from "./CharityInfo";
import { FaFacebookSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const mockCharityStats: any = [
  { title: "Headquaters", value: "Anytown, County, Country", rating: false },
  { title: " annual avg overhead", value: "A$14M", rating: false },
  { title: " annual avg donations", value: "A$14M", rating: false },
  { title: " # of employees", value: "5,600", rating: false },
  { title: " navigator rating", value: "90/100", rating: true },
  { title: " navigator rating", value: "94/100", rating: true },
];

function StatsItem({
  title,
  value,
  rating,
}: {
  title: string;
  value: string;
  rating: Boolean;
}) {
  return (
    <div className="paragraph mb-4">
      <p className="text-base text-white font-light text-xs tracking-wide uppercase">
        {title}
      </p>
      <p
        className={`text-base text-white text-xl font-semibold capitalize break-words w-115 ${
          rating && "text-leaf-green"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
interface DonationInfoProps {
  isDonate: boolean;
  onToggleDonation: () => void;
}
export function DonationInfo({
  isDonate,
  onToggleDonation,
}: DonationInfoProps) {
  //eslint-disable-next-line
  // const [modalIsOpen, setIsOpen] = useState(false);
  // function openInfoModal() {
  //   setIsOpen(true);
  // }
  // //eslint-disable-next-line
  // function closeInfoModal() {
  //   setIsOpen(false);
  // }
  console.log("isDonate ", isDonate);
  return (
    <div className="font-heading flex flex-col lg:flex-row self-start justify-between w-full 2xl:p-0 2xl:justify-start md:-mt-40 lg:mt-0 2xl:mt-0 2xl:flex-col 2xl:w-130 min-h-1/2 2xl:min-h-3/4 py-2">
      <div className="flex flex-col xl:w-128 2xl:min-h-1/2 bg-transparent px-0 md:px-10 mt-10 2xl:mt-0">
        <span className="inline-block text-center text-sm py-3 px-3 max-w-250 font-semibold uppercase text-gray-200 bg-angel-blue bg-opacity-50 hover:bg-opacity-30 rounded-2xl border-t border-b border-opacity-20 2xl:-mt-4">
          SDG #5: GENDER EQUALITY
        </span>
        <h2 className="text:4xl lg:text-4xl font-bold text-white uppercase mt-4 tracking-wide">
          Women for women international
        </h2>
        <div className="flex flex-row gap-2 mt-4">
          <button
            className={`uppercase ${
              isDonate ? "bg-angel-blue" : "bg-orange"
            } text-white font-semibold rounded-xl md:w-48 w-52 h-12 d-flex justify-center items-center mb-4`}
            onClick={onToggleDonation}
          >
            {isDonate ? "Close" : "DONATE NOW"}
          </button>
          {/* create a customizable IconButton component to replace all occurrences of this */}
          <button className="h-10 w-10 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey">
            <FaTwitter color="#3FA9F5" size="25" />
          </button>
          <button className="h-10 w-10 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey">
            <FaLinkedinIn color="#3FA9F5" size="25" />
          </button>
          <button className="h-10 w-10 bg-transparent py-2 px-2 mt-1 rounded-full inline-flex items-center border border-angel-blue hover:border-light-grey focus:border-light-grey">
            <FaFacebookSquare color="#3FA9F5" size="25" />
          </button>
        </div>
      </div>
      {/* charity stats */}

      <div className="flex flex-col h-full 2xl:h-80 px-0 md:px-10 lg:mt-10 2xl:mt-0 lg:overflow-y-scroll">
        {mockCharityStats.map(({ title, value, rating }: any, i: number) => (
          <StatsItem
            key={i}
            title={title}
            value={value}
            rating={rating}
          ></StatsItem>
        ))}
      </div>

      {/* charity stats */}
      {/* <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeInfoModal}
        contentLabel="Example Modal"
        className="absolute inset-1/2 bottom-auto right-auto max-w-4/5 min-h-modal rounded-3xl bg-white transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="flex justify-center">
          <div className="p-4 mx-auto text-thin-blue">
            <h2 className="text-2xl uppercase font-bold mb-2">charity info</h2>
            <CharityInfo />
          </div>
        </div>
      </Modal> */}
    </div>
  );
}

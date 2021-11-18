import { useState } from "react";
import YouTube, { Options } from "react-youtube";

import { CharityInfo } from "pages/Charity/CharityInfo";
import { DonationInfo } from "./DonationInfo";
import AppHead from "components/Headers/AppHead";
import Donator from "components/Donator/Donator";
import UserForm from "components/Donator/UserForm";

const Charity = () => {
  const [isDonate, setIsDonate] = useState(false);
  const title = "women for women international";
  const opts: Options = {
    height: "320",
    width: "480",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const onReady = (event: any) => {
    event.target.pauseVideo();
  };
  const toggleDonate = () => {
    setIsDonate(!isDonate);
  };
  return (
    <section className="container mx-auto grid pb-16 content-start gap-0">
      <AppHead />
      <div className="flex md:grid-cols-2 justify-start align-items-start w-full md:mx-auto md:container bg-gray-400 min-h-r15 gap-0 mt-5">
        <div className="flex flex-col w-128 min-h-3/4 hidden md:block bg-gray-200 p-10"></div>
        <div className="flex-grow w-full min-h-3/4 p-10 text-center bg-indigo"></div>
      </div>
    </section>
  );
};

export default Charity;

import { useState } from "react";
import YouTube, { Options } from "react-youtube";

import { CharityInfo } from "components/CharityInfo";
import { DonationForm } from "components/DonationForm";
import { DonationInfo } from "components/DonationInfo";

const Donate = () => {
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
  const pushTransactionStatus = () => {};
  const onReady = (event: any) => {
    event.target.pauseVideo();
  };
  const toggleDonate = () => {
    setIsDonate(!isDonate);
  };
  return (
    <section className="container mx-auto flex-auto py-5">
      <div className="flex flex-row justify-between pb-5">
        <div className="overflow-hidden lg:w-4/6 w-full lg:h-80 lg:pr-10">
          <img
            src="https://via.placeholder.com/960x320"
            alt="banner"
            className="rounded-lg h-full w-auto"
          />
        </div>
        <div className="lg:block hidden">
          <YouTube
            videoId="2g811Eo7K8U"
            opts={opts}
            className=""
            onReady={onReady}
          />
        </div>
      </div>
      <div className="flex flex-row text-white font-sans h-3/5">
        <div className="lg:block hidden">
          <CharityInfo />
        </div>
        <div className="lg:px-10 lg:w-3/5 md:w-2/3 md:pr-10 w-full">
          <h1 className="uppercase md:text-5xl text-4xl font-bold mb-6 leading-none">
            {title}
          </h1>
          <div className="md:hidden block">
            <DonationInfo isDonate={isDonate} onToggleDonation={toggleDonate} />
          </div>
          <div className="overflow-y-auto">
            {isDonate ? (
              <DonationForm pushTransactionStatus={pushTransactionStatus} />
            ) : (
              <div className="overflow-y-auto h-full">
                <div className="paragraph mb-4">
                  <p className="text-md">
                    Our global community invests in women survivors of war and
                    conflict, providing them with social and economic skills to
                    transform their own lives. Women pass their knowledge to
                    those around them, creating a more just world - a world
                    where every woman's voice, role, and contribution are
                    visible and valued.
                  </p>
                </div>
                <div className="paragraph mb-4">
                  <p className="text-md">
                    What is Women for Women international's Approach?
                  </p>
                  <span className="text-sm">
                    We invest where inequality is the greatest by helping women
                    who are forgotten - the women survivors of war and conflict.
                    We help them learn the skills they need to reuild their
                    famililes and communities.
                  </span>
                </div>
                <div className="paragraph mb-4">
                  <span className="text-sm">
                    In our Stronger Women, Stronger Nations Program, a woman
                    breaks the isolation of war and conflict by joining a small
                    group of women like her. Together, they learn to save, build
                    businesses, understand their rights, improve their health,
                    and change societal rules. They have the power to transform
                    our world.
                  </span>
                </div>
                <div className="paragraph mb-4">
                  <span className="text-sm">
                    For over 25 years, Women for Women international has used an
                    integrated approach to go beyond charity to innovation: We
                    are a learning organization that listens to data, our teams
                    on the ground, and women themselves to constantly evolve and
                    improve the way we work.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="rightbar lg:w-1/5 md:w-1/3 md:block hidden overflow-y-auto divide-grey-300 pr-5">
          <DonationInfo isDonate={isDonate} onToggleDonation={toggleDonate} />
        </div>
      </div>
    </section>
  );
};

export default Donate;

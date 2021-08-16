import { useState } from "react";
import Header from "components/Layout/Header";
import Footer from "components/Layout/Footer";
import { DonationForm } from "components/DonationForm";
import YouTube, { Options } from "react-youtube";

const Donate = () => {
  const [isDonate, setIsDonate] = useState(false);
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
  return (
    <div className="bg-gradient-to-b from-header-color to-footer-color">
      <Header hasMenu={true} onConnect={() => {}} onDisconnect={() => {}} />
      <section className="container mx-auto flex-auto py-5 h-fixed-content-height">
        <div className="flex flex-row justify-between pb-5">
          <div className="overflow-hidden w-4/6 h-80">
            <img
              src="https://via.placeholder.com/960x320"
              alt="banner"
              className="rounded-lg"
            />
          </div>
          <div>
            <YouTube
              videoId="2g811Eo7K8U"
              opts={opts}
              className=""
              onReady={onReady}
            />
          </div>
        </div>
        <div className="flex flex-row text-white font-sans h-3/5">
          <div className="leftbar w-1/5 overflow-y-auto">
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm">headquarters</p>
              <span className="text-xl">Anytown, Country, Country</span>
            </div>
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm">Annual Avg overhead</p>
              <span className="text-xl">$14M</span>
            </div>
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm">Annual Avg donations</p>
              <span className="text-xl">$10M</span>
            </div>
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm"># Of employees</p>
              <span className="text-xl">4,600</span>
            </div>
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm">navigator rating</p>
              <span className="text-xl text-leaf-green-color">85/100</span>
            </div>
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm">impact rating</p>
              <span className="text-xl text-leaf-green-color">94/100</span>
            </div>
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm">leadership rating</p>
              <span className="uppercase text-xl text-orange-color">
                comming soon
              </span>
            </div>
            <div className="total-info-item mb-4">
              <p className="uppercase text-sm">culture rating</p>
              <span className="uppercase text-xl text-orange-color">N/A</span>
            </div>
          </div>
          <div className="px-10 w-3/5">
            <h1 className="uppercase text-5xl mb-6 leading-none">
              women for women international
            </h1>
            <div className="overflow-y-auto h-donate-content-height">
              {isDonate ? (
                <DonationForm pushTransactionStatus={pushTransactionStatus} />
              ) : (
                <div className="overflow-y-auto h-full">
                  <div className="paragraph mb-4">
                    <p className="text-sm">
                      Our global community invests in women survivors of war and
                      conflict, providing them with social and economic skills
                      to transform their own lives. Women pass their knowledge
                      to those around them, creating a more just world - a world
                      where every woman's voice, role, and contribution are
                      visible and valued.
                    </p>
                  </div>
                  <div className="paragraph mb-4">
                    <p className="text-sm">
                      What is Women for Women international's Approach?
                    </p>
                    <span className="text-xs">
                      We invest where inequality is the greatest by helping
                      women who are forgotten - the women survivors of war and
                      conflict. We help them learn the skills they need to
                      reuild their famililes and communities.
                    </span>
                  </div>
                  <div className="paragraph mb-4">
                    <span className="text-xs">
                      In our Stronger Women, Stronger Nations Program, a woman
                      breaks the isolation of war and conflict by joining a
                      small group of women like her. Together, they learn to
                      save, build businesses, understand their rights, improve
                      their health, and change societal rules. They have the
                      power to transform our world.
                    </span>
                  </div>
                  <div className="paragraph mb-4">
                    <span className="text-xs">
                      For over 25 years, Women for Women international has used
                      an integrated approach to go beyond charity to innovation:
                      We are a learning organization that listens to data, our
                      teams on the ground, and women themselves to constantly
                      evolve and improve the way we work.
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="rightbar w-1/5 overflow-y-auto divide-grey-300 divide-y pr-5">
            <div className="mb-2">
              {!isDonate ? (
                <button
                  className="uppercase bg-orange-color rounded-xl w-56 h-12 d-flex justify-center items-center mb-4"
                  onClick={() => {
                    setIsDonate(true);
                  }}
                >
                  DONATE NOW
                </button>
              ) : (
                <button
                  className="uppercase bg-yellow-blue-color rounded-xl w-56 h-12 d-flex justify-center items-center mb-4"
                  onClick={() => {
                    setIsDonate(false);
                  }}
                >
                  BACK TO CHARITY
                </button>
              )}
              <button className="uppercase bg-thin-blue-color rounded-xl w-56 h-12 d-flex justify-center items-center mb-2">
                VISIT SITE
              </button>
            </div>
            <div className="donation-info mt-2 pt-2">
              <div className="donation-info-item mb-4">
                <p className="uppercase">Total donations</p>
                <span className="text-4xl">$4.200</span>
              </div>
              <div className="donation-info-item mb-4">
                <p className="uppercase">Angel ranking this week</p>
                <span className="text-xl">
                  <span className="text-leaf-green-color">&#9650;</span> #300
                </span>
              </div>
              <div className="donation-info-item mb-4">
                <p className="uppercase">Angel ranking last week</p>
                <span className="text-xl">#498</span>
              </div>
              <div className="donation-info-item mb-4">
                <p className="uppercase">Donations per month</p>
                <span className="text-xl">
                  <span className="text-leaf-green-color">&#9650;</span> 48.9
                </span>
              </div>
              <div className="donation-info-item mb-4">
                <p className="uppercase">AVG. donation</p>
                <span className="text-xl">
                  <span className="text-dark-red-color">&#9660;</span> $57.7
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer hasMenu={true} />
    </div>
  );
};

export default Donate;

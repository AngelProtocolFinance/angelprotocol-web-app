import { Video, videos } from "components/video/video";

type IFeatureItem = {
  leftText: string;
  rightText: string;
};

function FeatureItem({ leftText, rightText }: IFeatureItem) {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-3 items-center">
      <p className="text-right font-semibold">{leftText}</p>
      <p>{rightText}</p>
    </div>
  );
}

export function Top({ classes = "" }) {
  return (
    <section
      className={`${classes} grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto p-4`}
    >
      <Video vid={videos.donation_calculator} />

      {/* Content section */}
      <div className="flex flex-col justify-center">
        <div className="text-blue font-bold text-xl mb-2">
          SAVE MORE. RAISE MORE. DO MORE.
        </div>

        <div className="relative mb-6">
          <h1 className="text-5xl font-bold font-heading">Smarter Donations</h1>
          <h1 className="text-5xl font-bold font-heading">Bigger Impact</h1>
          <div className="absolute -left-16 top-16 rotate-[-20deg] font-gochi text-lg">
            Watch how it works!
          </div>
          <div className="absolute -left-12 top-10">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 30C25 15 30 5 30 5"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M10 5L30 5L30 25"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="absolute right-0 -z-10 top-12 bg-blue-l4 h-6 w-64"></div>
        </div>

        <p className="mb-8 text-lg">
          Every day you're paying more in fees and missing out on growth. Better
          Giving helps turn that around with modern donation options, automatic
          investing, and no platform fees — all set up in just minutes.
        </p>

        <div className="grid grid-cols-1 gap-6 mb-8">
          <FeatureItem
            leftText="80% of donors cover fees* — keep more of every gift"
            rightText="Accept crypto, stocks, DAFs & more — raise more effortlessly"
          />

          <FeatureItem
            leftText="Earn 4%–20% on idle donations — no extra work"
            rightText="Get your custom savings report — free with sign-up in seconds"
          />
        </div>

        <button className="btn btn-blue rounded-full py-4 px-8 text-lg w-full md:w-auto self-center mb-4">
          See Your Savings - Launch the Calculator
        </button>

        <p className="text-center text-sm text-gray-600">
          *"It takes less than a minute — find out how much you're leaving on
          the table."
        </p>
      </div>
    </section>
  );
}

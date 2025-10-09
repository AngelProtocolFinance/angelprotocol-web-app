import { Modal } from "components/modal";
import { Video, videos } from "components/video";
import { useHubspotDonCalculatorForm } from "hooks/use-hubspot-don-calculator-form";
import { useState } from "react";
import { useNavigate } from "react-router";

export function Top({ classes = "" }) {
  const [open, set_open] = useState(false);
  const navigate = useNavigate();
  const { state } = useHubspotDonCalculatorForm();
  return (
    <section
      className={`${classes} grid grid-cols-1 lg:grid-cols-2 gap-12 p-4 @container`}
    >
      <div className="h-fit self-center relative">
        <Tooltip className="max-xl:hidden absolute -right-24 z-10" />
        <Video
          vid={videos.donation_calculator}
          classes="relative shadow-xl shadow-black/10 rounded-lg"
        />
      </div>
      <div>
        <h1 className="text-4.5xl leading-snug max-lg:text-center text-right">
          <div className="relative w-fit max-lg:mx-auto lg:ml-auto text-nowrap">
            You're Losing Donations{" "}
            <span className="absolute bottom-2 left-0 w-full h-4 bg-blue-l3 -z-10" />
          </div>
        </h1>
        <p className="mb-4 text-gray-d4 text-lg max-lg:text-center text-right mt-4">
          Thousands of dollars are slipping through the cracks every year – lost
          to fees, idle cash, and outdated donation methods.
        </p>
        <p className="mb-4 text-gray-d4 font-semibold text-lg max-lg:text-center text-right mt-4">
          The longer you wait, the more you miss.
        </p>
        <div className="mb-4 text-gray-d4 text-lg max-lg:text-center text-right">
          See see exactly how much revenue is being left on the table – and how
          quickly you could turn that around.
        </div>
        <button
          onClick={() => {
            if (state !== "loaded") {
              return navigate("/donation-calculator");
            }
            set_open(true);
          }}
          type="button"
          className="mt-8 shadow-xl capitalize shadow-black/10 btn btn-blue text-center lg:text-right justify-self-center lg:justify-self-end rounded-lg py-4 px-8 w-full md:w-auto"
        >
          See what you're losing
        </button>
        {open && (
          <Modal
            classes="fixed-center z-10 grid text-gray-d4 bg-white w-[calc(100%-2.5rem)] max-w-4xl rounded-lg"
            open={open}
            onClose={() => set_open(false)}
          >
            <div
              className="hs-form-frame"
              data-region="eu1"
              data-form-id="17bb2a2b-322c-4a8c-b8d6-50bb1a59881c"
              data-portal-id="24900163"
            />
          </Modal>
        )}

        <p className="max-lg:text-center text-right text-sm text-gray mt-2">
          "It takes less than a minute — find out how much you're leaving on the
          table."
        </p>
      </div>
    </section>
  );
}

function Tooltip({ className = "" }) {
  return (
    <span className={`text-gray-d4 ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="99"
        height="50.6"
        viewBox="0 0 90.2 49.5"
        fill="none"
        className="rotate-320"
      >
        <path
          d="M86.5184 47.9261C86.9386 48.7464 87.891 49.0896 88.7113 48.6694C89.5316 48.2492 89.8748 47.2968 89.4546 46.4765L86.5184 47.9261ZM0.750315 12.1702C0.292122 12.8603 0.480187 13.7913 1.17037 14.2495L12.4175 21.7161C13.1077 22.1743 14.0387 21.9863 14.4969 21.2961C14.955 20.6059 14.767 19.675 14.0768 19.2168L4.07932 12.5797L10.7164 2.58225C11.1746 1.89207 10.9865 0.961128 10.2963 0.502936C9.60613 0.0447435 8.67518 0.232808 8.21699 0.92299L0.750315 12.1702ZM89.4546 46.4765C82.5494 32.4322 74.5 21.0234 61.0685 14.6649C47.6713 8.3195 29.2413 7.1537 1.87328 12.6825L2.46732 15.6231C28.8433 10.0943 46.2017 11.7514 58.6565 17.6475C71.0773 23.5315 78.7006 33.7177 86.5184 47.9261L89.4546 46.4765Z"
          fill="#183244"
        />
      </svg>
      <p className="text-gray-d4 -top-6 left-8 relative -rotate-[12deg] font-gochi text-nowrap">
        Watch how it works!
      </p>
    </span>
  );
}

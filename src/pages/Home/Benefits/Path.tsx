import { useState } from "react";
// import Button from "../common/Button";
import BenefitsCarousel from "./BenefitsCarousel";
import Carousel from "./Carousel";
import icon1 from "./icons/Icon1_wb.webp";
import icon2 from "./icons/Icon2_wb.webp";
import icon3 from "./icons/Icon3_wb.webp";
import icon4 from "./icons/Icon4_wb.webp";
import icon5 from "./icons/Icon5_wb.webp";
import icon6 from "./icons/Icon6_wb.webp";
import icon7 from "./icons/Icon7_wb.webp";
import icon8 from "./icons/Icon8_wb.webp";
import { Slide } from "./types";

const colors = ["bg-[#EDFCE2]", "bg-[#EAE2FC]", "bg-[#FCF6E2]", "bg-[#EDF2FE]"];
type TPath = "non-profits" | "donors";
const Path = () => {
  const [path, setPath] = useState<TPath>("non-profits");
  const nonProfits: Slide[] = [
    {
      title: "Sustainable Impact",
      description:
        "Your donation grows through our nonprofit Sustainability Fund. Give the gift that keeps on giving.",
      img_src: icon1,
      bgColorClass: colors[0],
    },
    {
      title: "The World At Your Fingertips",
      description:
        "Donate to any nonprofit, anywhere in the world. Support local grassroots organizations who understand the problems on the ground",
      img_src: icon2,
      bgColorClass: colors[1],
    },
    {
      title: "Receive and Track Tax Benefits",
      description:
        "Get automated receipts to claim deductions and eliminate capital gains tax when donating property such as stocks and crypto",
      img_src: icon3,
      bgColorClass: colors[2],
    },
    {
      title: "Your Donation, Your Way",
      description:
        "Use the giving method that works for you - from check, card and bank transfers to stock, DAF and crypto",
      img_src: icon4,
      bgColorClass: colors[3],
    },
  ];
  const donors: Slide[] = [
    {
      title: "Expanded Funding Channels",
      description:
        "Tap into new sources of funding by accepting cash, crypto, stocks, donor funds, and more.",
      img_src: icon5,
      bgColorClass: colors[0],
    },
    {
      title: "Recurring Revenue Streams",
      description:
        "Get perpetual funding as your donor gifts grow inside our Sustainability Fund's balanced investment portfolio",
      img_src: icon6,
      bgColorClass: colors[1],
    },
    {
      title: "Simplified Donation Management",
      description:
        "Forget the admin hassle. We handle the complexity of processing diverse donations, issuing automated tax receipts, and consolidating donor data",
      img_src: icon7,
      bgColorClass: colors[2],
    },
    {
      title: "Global Reach and Fiscal Sponsorship",
      description:
        "Unlock new worldwide donor pipelines and accept cross-border gifts through fiscal sponsorship. Expand your global community.",
      img_src: icon8,
      bgColorClass: colors[3],
    },
  ];

  return (
    <section className="relative grid">
      <h3 className="text-[13px] md:text-[18px] uppercase text-blue-d1 text-center mb-4">
        Bridge to better
      </h3>
      <h2 className="text-[32px] md:text-[42px] capitalize text-navy-d4 leading-snug text-center mb-11">
        Amplifying impact for all
      </h2>
      <div className="flex p-1 bg-[#F6EFE5] font-medium rounded-3xl gap-2 justify-self-center mb-11">
        <button
          type="button"
          className={`${
            path === "non-profits" ? "bg-white" : "bg-transparent"
          } py-2 px-6 rounded-3xl`}
          onClick={() => setPath("non-profits")}
        >
          For Donors
        </button>
        <button
          type="button"
          className={`${
            path === "donors" ? "bg-white" : "bg-transparent"
          } py-2 px-6 rounded-3xl`}
          onClick={() => {
            setPath("donors");
          }}
        >
          For Nonprofits
        </button>
      </div>
      <p className="text-lg md:text-[28px] font-medium text-navy-l1/60 text-center mb-11">
        {path === "non-profits"
          ? "Access our free fundraising technology and tools."
          : "Join our global community and amplify your charitable giving."}
      </p>

      <BenefitsCarousel
        slides={path === "non-profits" ? nonProfits : donors}
        classes="max-lg:hidden"
      />
      <Carousel
        slides={path === "non-profits" ? nonProfits : donors}
        classes="lg:hidden"
      />
      {/* TODO: enable once we have the static pages ready */}
      {/*<Button text="Learn More" />*/}
    </section>
  );
};

export default Path;

import React, { useState } from "react";
import icon1 from "../../../../assets/landing/Icon1_wb.webp";
import icon2 from "../../../../assets/landing/Icon2_wb.webp";
import icon3 from "../../../../assets/landing/Icon3_wb.webp";
import icon4 from "../../../../assets/landing/Icon4_wb.webp";
import icon5 from "../../../../assets/landing/Icon5_wb.webp";
import icon6 from "../../../../assets/landing/Icon6_wb.webp";
import icon7 from "../../../../assets/landing/Icon7_wb.webp";
import icon8 from "../../../../assets/landing/Icon8_wb.webp";
import BenefitsCarousel from "../../../../components/landing/BenefitsCarousel";
import Button from "../../../../components/landing/Button";
import Carousel from "../../../../components/landing/Carousel";
const Path = () => {
  const [path, setPath] = useState("non-profits");
  const [nonProfits, _setNonProfits] = useState([
    {
      title: "Sustainable Impact",
      description:
        "Your donation grows through our nonprofit Sustainability Fund. Give the gift that keeps on giving.",
      img_src: icon1,
    },
    {
      title: "The World At Your Fingertips",
      description:
        "Donate to any nonprofit, anywhere in the world. Support local grassroots organizations who understand the problems on the ground",
      img_src: icon2,
    },
    {
      title: "Receive and Track Tax Benefits",
      description:
        "Get automated receipts to claim deductions and eliminate capital gains tax when donating property such as stocks and crypto",
      img_src: icon3,
    },
    {
      title: "Your Donation, Your Way",
      description:
        "Use the giving method that works for you - from check, card and bank transfers to stock, DAF and crypto",
      img_src: icon4,
    },
  ]);
  const [donors, _setDonors] = useState([
    {
      title: "Expanded Funding Channels",
      description:
        "Tap into new sources of funding by accepting cash, crypto, stocks, donor funds, and more.",
      img_src: icon5,
    },
    {
      title: "Recurring Revenue Streams",
      description:
        "Get perpetual funding as your donor gifts grow inside our Sustainability Fund's balanced investment portfolio",
      img_src: icon6,
    },
    {
      title: "Simplified Donation Management",
      description:
        "Forget the admin hassle. We handle the complexity of processing diverse donations, issuing automated tax receipts, and consolidating donor data",
      img_src: icon7,
    },
    {
      title: "Global Reach and Fiscal Sponsorship",
      description:
        "Unlock new worldwide donor pipelines and accept cross-border gifts through fiscal sponsorship. Expand your global community.",
      img_src: icon8,
    },
  ]);

  return (
    <section className="px-[24px] lg:pt-0 lg:p-[28px] md:pt-0 md:p-[30px] pt-0 flex flex-col gap-[50px] lg:gap-[0px] mt-[-200px] mb-16  xl:max-w-[1440px] xl:m-auto xl:-mt-20">
      <div className="flex flex-col gap-[42px]">
        <span className="flex flex-col items-center gap-2 ">
          <h3 className="text-[13px] md:text-[18px] uppercase font-bold text-[#2D89C8] font-heading">
            Bridge to better
          </h3>
          <h2 className="text-[32px] md:text-[42px] capitalize font-bold text-[#183244] lg:w-full  md:max-w-full lg:text-center text-center leading-snug font-heading">
            Amplifying Impact For All
          </h2>
        </span>
        <span className="flex p-1  bg-[#F6EFE5] font-medium cursor-pointer rounded-3xl gap-2 self-center">
          <span
            className={`${
              path === "non-profits" ? "bg-white" : "bg-transparent"
            } py-2 px-6 rounded-3xl font-body`}
            onClick={() => setPath("non-profits")}
          >
            For Donors
          </span>
          <span
            className={`${
              path === "donors" ? "bg-white" : "bg-transparent"
            } py-2 px-6 rounded-3xl font-body`}
            onClick={() => {
              setPath("donors");
            }}
          >
            For Nonprofits
          </span>
        </span>
        {path === "non-profits" ? (
          <p className="text-[18px] md:text-[28px] font-medium w-full lg:max-w-[60%] md:max-w-[70%]  opacity-60  text-[#1D3C51] text-center  mx-auto font-body">
            Access our free fundraising technology and tools.
          </p>
        ) : (
          <p className="text-[18px] md:text-[28px] font-medium w-full lg:max-w-[60%] md:max-w-[70%]  opacity-60  text-[#1D3C51] text-center  mx-auto font-body">
            Join our global community and amplify your charitable giving.
          </p>
        )}
      </div>
      <BenefitsCarousel
        path={path}
        slides={path === "non-profits" ? nonProfits : donors}
      />
      <Carousel slides={path === "non-profits" ? nonProfits : donors} />
      <Button text={"Learn More"} className={"self-center"} />
    </section>
  );
};

export default Path;

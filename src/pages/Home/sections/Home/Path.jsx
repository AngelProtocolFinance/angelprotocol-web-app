import React, { useState } from "react";
import JoinUsBanner from "../../components/JoinUsBanner";
import BenefitssCrousal from "../../components/BenefitssCrousal";
import Crousal from "../../components/Crousal";
import Button from "../../components/Button";

const Path = () => {
  const [path, setPath] = useState("non-profits");
  const [nonProfits, setNonProfits] = useState([
    {
      title: "Sustainable Impact",
      description:
        "Your donation grows through our nonprofit Sustainability Fund. Give the gift that keeps on giving.",
      img_src: "/Icon1_wb.webp",
      // img_src: "/card_1_imageUpdate.png",
    },
    {
      title: "The World At Your Fingertips",
      description:
        "Donate to any nonprofit, anywhere in the world. Support local grassroots organizations who understand the problems on the ground",
      img_src: "/Icon2_wb.webp",
      // img_src: "/card_2_imageUpdate.png",
    },
    {
      title: "Receive and Track Tax Benefits",
      description:
        "Get automated receipts to claim deductions and eliminate capital gains tax when donating property such as stocks and crypto",
      img_src: "/Icon3_wb.webp",
      // img_src: "/card_3_imageUpdate.png",
    },
    {
      title: "Your Donation, Your Way",
      description:
        "Use the giving method that works for you - from check, card and bank transfers to stock, DAF and crypto",
      img_src: "/Icon4_wb.webp",
      // img_src: "/card_4_imageUpdate.png",
    },
  ]);
  const [donors, setDonors] = useState([
    {
      title: "Expanded Funding Channels",
      description:
        "Tap into new sources of funding by accepting cash, crypto, stocks, donor funds, and more.",
      img_src: "/Icon5_wb.webp",
      // img_src: "/card_1_imageUpdatedonor.png",
    },
    {
      title: "Recurring Revenue Streams",
      description:
        "Get perpetual funding as your donor gifts grow inside our Sustainability Fund's balanced investment portfolio",
      img_src: "/Icon6_wb.webp",
      // img_src: "/card_2_imageUpdatedonor.png",
    },
    {
      title: "Simplified Donation Management",
      description:
        "Forget the admin hassle. We handle the complexity of processing diverse donations, issuing automated tax receipts, and consolidating donor data",
      img_src: "/Icon7_wb.webp",
      // img_src: "/card_3_imageUpdatedonor.png",
    },
    {
      title: "Global Reach and Fiscal Sponsorship",
      description:
        "Unlock new worldwide donor pipelines and accept cross-border gifts through fiscal sponsorship. Expand your global community.",
      img_src: "/Icon8_wb.webp",
      // img_src: "/card_4_imageUpdatedonor.png",
    },
  ]);

  return (
    <section className="px-[24px] lg:pt-0 lg:p-[28px] md:pt-0 md:p-[30px] pt-0 flex flex-col gap-[50px] lg:gap-[0px] mt-[-200px] mb-16  xl:max-w-[1440px] xl:m-auto xl:-mt-20">
      <div className="flex flex-col gap-[42px]">
        <span className="flex flex-col items-center gap-2 ">
          <h3 className="text-[13px] md:text-[18px] uppercase font-bold text-[#2D89C8] Quicksand">
            Bridge to better
          </h3>
          <h2 className="text-[32px] md:text-[42px] capitalize font-bold text-[#183244] lg:w-full  md:max-w-full lg:text-center text-center leading-snug Quicksand">
            Amplifying Impact For All
          </h2>
        </span>
        <span className="flex p-1  bg-[#F6EFE5] font-medium cursor-pointer rounded-3xl gap-2 self-center">
          <span
            className={`${
              path === "non-profits" ? "bg-white" : "bg-transparent"
            } py-2 px-6 rounded-3xl DM_Sans`}
            onClick={() => setPath("non-profits")}
          >
            For Donors
          </span>
          <span
            className={`${
              path === "donors" ? "bg-white" : "bg-transparent"
            } py-2 px-6 rounded-3xl DM_Sans`}
            onClick={() => {
              setPath("donors");
            }}
          >
            For Nonprofits
          </span>
        </span>
        {path === "non-profits" ? (
          <p className="text-[18px] md:text-[28px] font-medium w-full lg:max-w-[60%] md:max-w-[70%]  opacity-60  text-[#1D3C51] text-center  mx-auto DM_Sans">
           Access our free fundraising technology and tools.
          </p>
        ) : (
          <p className="text-[18px] md:text-[28px] font-medium w-full lg:max-w-[60%] md:max-w-[70%]  opacity-60  text-[#1D3C51] text-center  mx-auto DM_Sans">
            Join our global community and amplify your charitable giving.
          </p>
        )}
      </div>
      <BenefitssCrousal
        path={path}
        slides={path === "non-profits" ? nonProfits : donors}
      />
      <Crousal slides={path === "non-profits" ? nonProfits : donors} />
      <Button text={"Learn More"} className={"self-center"} />
    </section>
  );
};

export default Path;

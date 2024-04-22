import { appRoutes } from "constants/routes";
import useCards from "pages/Marketplace/Cards/useCards";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import frame1 from "../../assets/landing/frame_1.png";
import frame2 from "../../assets/landing/frame_2.png";
import frame3 from "../../assets/landing/frame_3.png";
import frame4 from "../../assets/landing/frame_4.png";
import frame5 from "../../assets/landing/frame_5.png";
import frame6 from "../../assets/landing/frame_6.png";
import mappng from "../../assets/landing/map.png";
import Button from "./Button";
import Card from "./Card";

const HeroBottom = () => {
  const [, setShowPrevButton] = useState(false);
  const [, setShowNextButton] = useState(true);

  const handleSlideChange = (swiper) => {
    setShowPrevButton(!swiper.isBeginning);
    setShowNextButton(!swiper.isEnd);
  };
  const [donations, setDonations] = useState([
    {
      active_in_countries: ["United States"],
      card_img: "",
      endow_designation: "Charity",
      id: 22,
      hq_country: "United States",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1703950147112-no_background_logo_(1).png",
      name: "Anna's Pals",
      sdgs: [3],
      tagline:
        "Improving the Lives of Hospitalized Children and Their Families",
      claimed: true,
    },
    {
      active_in_countries: ["United States", "United Kingdom"],
      card_img:
        "https://endow-profiles.s3.amazonaws.com/1712669873120-Screenshot_2024-03-27_at_11.16.33.png",
      endow_designation: "Charity",
      id: 1,
      hq_country: "United States",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1704724776997-Vertical_Blue.png",
      name: "Better Giving",
      sdgs: [17],
      tagline: "Raise funds today, grow funds forever!",
      claimed: true,
    },
    {
      active_in_countries: ["Nigeria"],
      card_img: "",
      endow_designation: "Charity",
      id: 18,
      hq_country: "Nigeria",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1695381594107-CAHLI.jpg",
      name: "Care For Healthy Life Initiative",
      sdgs: [1, 2, 3, 4, 5, 6, 13, 17],
      tagline:
        "Poverty Alleviation, HIV/AIDS, Gender Equality, Education, Food Security, Physical Health, Child Protection, Disability Rights, Clean Water.",
      claimed: true,
    },
    {
      active_in_countries: ["United States"],
      card_img: "",
      endow_designation: "Charity",
      id: 119,
      hq_country: "United States",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1712673419635-Final_Logo_Graphic_for_Better_Giving.png",
      name: "Circle of Care for families of children with cancer",
      sdgs: [3],
      tagline:
        "Until no parent hears the words, \"you're child has cancer,\" we'll be there.",
      claimed: true,
    },
    {
      active_in_countries: ["Kenya"],
      card_img: "",
      endow_designation: "Charity",
      id: 92,
      hq_country: "Kenya",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1708009627312-New_Logo-CHC-01.png",
      name: "Climate and Health Connect",
      sdgs: [4, 3, 11],
      tagline: "Promoting Human and Environmental Health",
      claimed: true,
    },
    {
      active_in_countries: ["United States"],
      card_img: "",
      endow_designation: "Charity",
      id: 98,
      hq_country: "United States",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1708131998232-Circular_background.png",
      name: "Coalition for Engaged Eduction",
      sdgs: [10, 4, 8],
      tagline: "We meet youth where they are at.",
      claimed: true,
    },
    {
      active_in_countries: ["United Kingdom", "Lebanon"],
      card_img: "",
      endow_designation: "Charity",
      id: 127,
      hq_country: "United Kingdom",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1712136374746-Screenshot_2024-04-03_at_12.25.52_PM.png",
      name: "CodeBrave Foundation",
      sdgs: [4, 8],
      tagline: "Powering Lebanon's next generation with tech skills",
      claimed: true,
    },
    {
      active_in_countries: ["Sierra Leone"],
      card_img: "",
      endow_designation: "Charity",
      id: 61,
      hq_country: "Sierra Leone",
      kyc_donors_only: false,
      logo: "",
      name: "Community Action for Sustainable Development Sierra Leone",
      sdgs: [1, 5, 10, 8, 13],
      tagline: "Community Action for Sustainable Development Sierra Leone",
      claimed: true,
    },
    {
      active_in_countries: [
        "Central African Republic",
        "DR Congo",
        "Cameroon",
        "Gabon",
        "Guinea",
        "Republic of the Congo",
      ],
      card_img: "",
      endow_designation: "Charity",
      id: 96,
      hq_country: "DR Congo",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1707745361561-Logo_CBI_OK.jpeg",
      name: "Congo Biotropical Institute (CBI)",
      sdgs: [1, 2, 3, 8, 12, 13, 15, 17],
      tagline:
        "Let's work with local communities and indigenous peoples to ensure the sustainable management of the Congo Basin rainforest.",
      claimed: true,
    },
    {
      active_in_countries: [
        "United States",
        "Ukraine",
        "Poland",
        "Romania",
        "India",
        "Pakistan",
        "Sudan",
      ],
      card_img: "",
      endow_designation: "Charity",
      id: 16,
      hq_country: "United States",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1696258732414-logo_kk.PNG",
      name: "CORE Community Organized Relief Effort",
      sdgs: [3, 13, 1],
      tagline:
        "We envision a more equitable world in which underserved communities are prepared and can effectively respond to crisis from within.",
      claimed: true,
    },
    {
      active_in_countries: ["Uganda"],
      card_img: "",
      endow_designation: "Charity",
      id: 82,
      hq_country: "Uganda",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1706862804466-1706845572216.jpg",
      name: "CURTIN CHILD LEARNING CENTER (CLICCS)",
      sdgs: [4, 1, 8, 5, 17],
      tagline: "Nursery and Primary school.",
      claimed: true,
    },
    {
      active_in_countries: ["New Zealand"],
      card_img: "",
      endow_designation: "Charity",
      id: 30,
      hq_country: "New Zealand",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1695782434589-Ripple_effect_smaller.png",
      name: "DeFi Ripple Effects",
      sdgs: [3],
      tagline: "Getting up every day to try and make the world a better place",
      claimed: true,
    },
    {
      active_in_countries: ["DR Congo", "Uganda"],
      card_img: "",
      endow_designation: "Charity",
      id: 11,
      hq_country: "DR Congo",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1695335106170-PEPA_logo.jpg",
      name: "EMPLOYER",
      sdgs: [2, 1, 3, 4, 5, 6, 16, 17],
      tagline: "hunger, child support, humantarian support",
      claimed: true,
    },
    {
      active_in_countries: ["India"],
      card_img: "",
      endow_designation: "Charity",
      id: 34,
      hq_country: "India",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1695953142573-end-poverty.jpg",
      name: "End Poverty",
      sdgs: [1, 2, 3],
      tagline:
        "Tackling poverty, empowering individuals, and building resilience",
      claimed: true,
    },
    {
      active_in_countries: ["Brazil"],
      card_img: "",
      endow_designation: "Other",
      id: 57,
      hq_country: "Brazil",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1706813143728-logo_300x300.png",
      name: "Espaço Voa",
      sdgs: [4, 5, 8, 10, 17],
      tagline: "Espaço Voa: Nurturing Dreams, Fostering Growth. ",
      claimed: true,
    },
    {
      active_in_countries: ["United States"],
      card_img: "",
      endow_designation: "Charity",
      id: 21,
      hq_country: "United States",
      kyc_donors_only: false,
      logo: "https://endow-profiles.s3.amazonaws.com/1703002757565-F2F_Logo_no_white_space.jpg",
      name: "Family to Family Network",
      sdgs: [3, 4, 10, 8],
      tagline: "Create Success for Children with Disabilities!",
      claimed: true,
    },
  ]);
  const { data } = useCards();

  useEffect(() => {
    if (data) {
      setDonations(data?.Items);
    }
  }, [data]);
  return (
    <div className="relative bottom-[300px] lg:bottom-[300px]   md:bottom-[350px] z-10 pt-[50px] px-[24px] ">
      <img
        src={mappng}
        alt="map"
        className=" w-[841px] h-[403px] lg:w-full md:w-full lg:h-[70%] md:h-[50%]  absolute lg:bottom-[-20%] lg:left-8 md:bottom-[-16%] md:left-4  z-[-88] bottom-[-12%] left-2 opacity-[1] lg:scale-[1] md:scale-[1] scale-[1] lg:object-fill object-cover object-center"
      />
      <svg
        viewBox="0 0 1440 1533"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 left-0 z-[-8] overflow-hidden w-full h-full"
      >
        <g opacity=".4" filter="url(#filter0_f_443_2773)">
          <path
            d="M195 1091.5C43.4 1208.3 -115.5 813.443 -157 685.443C-157 495.043 -547 418.11 -742 403.443C-485.667 390.943 162.4 362.643 704 349.443C1381 332.943 1489.5 782.943 947.5 685.443C405.5 587.943 384.5 945.5 195 1091.5Z"
            fill="#3DD3A6"
            fillOpacity="0.5"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_443_2773"
            x="-1162"
            y="-71"
            width="2874.37"
            height="1603.84"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="210"
              result="effect1_foregroundBlur_443_2773"
            />
          </filter>
        </defs>
      </svg>
      <div
        style={{ zIndex: "-1" }}
        className="absolute top-0 left-0 w-full h-[60%]  bg-[#fdfdfd] blur-[400px]"
      ></div>
      <div className=" absolute bottom-[0%] right-[-20%] w-[60%] h-[60%] rounded-full bg-[#fdefd1]   z-[-12] blur-[450px]"></div>

      <div className="flex flex-col items-center gap-5   ">
        <span className="flex flex-col items-center gap-3 mb-10 ">
          <h3 className="text-lg uppercase font-bold text-[#2D89C8] font-heading text-[13px] md:text-[18px]">
            Bridge to better
          </h3>
          <h2 className="text-[32px] md:text-[42px] lg:w-full md:w-8/12 text-center capitalize font-bold text-[#183244] font-heading">
            Connecting Donors to Causes That Matter
          </h2>
        </span>

        <div className=" relative  flex items-center  md:gap-3 xl:gap-4 lg:justify-between w-fit top-0 left-[0%]   h-full  ">
          <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] top-[-2%] left-[-20%] blur-[100px] rounded-full"></div>
          <button className="cause-prev lg:relative  lg:top-[90%] lg:left-[0%] lg:translate-y-[-50%] lg:p-3 w-fit h-fit md:p-3  bg-white rounded-full borderLine shadow-md md:absolute md:top-[42.5%] md:translate-y-[-50%] md:left-[2%] z-10  top-[42.5%] translate-y-[-50%]  absolute left-[-5%]  lg:-mt-7 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-[#2D89C8] w-[24px] h-[24px] font-bold"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <div className="lg:h-[520px] w-[85vw]">
            <Swiper
              slidesPerView={"auto"}
              loop={true}
              breakpoints={{
                300: {
                  spaceBetween: 20,
                  slidesPerView: 1,
                  centeredSlides: true,
                },
                768: {
                  spaceBetween: 20,
                  slidesPerView: 2,
                  initialSlide: 2,
                  centeredSlides: true,
                },
                1100: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              navigation={{
                nextEl: ".cause-next",

                prevEl: ".cause-prev",
                clickable: true,
              }}
              onSlideChange={(swiper) => handleSlideChange(swiper)}
              modules={[Navigation]}
              className="cause-swiper"
            >
              {donations?.map((ele, idx) => {
                if (ele?.logo)
                  return (
                    <SwiperSlide key={idx}>
                      <Card
                        name={ele?.name}
                        work={ele?.tagline}
                        supporters_count={ele?.supporters_count}
                        img_src={ele?.logo}
                        logo={ele?.logo}
                        id={ele?.id}
                      />
                    </SwiperSlide>
                  );
              })}
            </Swiper>
          </div>
          <button className="cause-next  lg:-mt-7 lg:relative lg:top-[42%] lg:right-[0%] lg:translate-y-[-50%] lg:p-3 md:p-3  bg-white rounded-full borderLine z-[777] shadow-md md:absolute absolute md:top-[42%] md:right-[2%] top-[42.5%] translate-y-[-50%] z-40  right-[-5%] p-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-[#2D89C8] w-[24px] h-[24px] font-bold "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] blur-[100px] right-[-15%] top-[-2%]  rounded-full"></div>
        </div>

        <Link to={appRoutes.marketplace} className="block -mt-30 z-40">
          <Button text={"Explore All Causes"} />
        </Link>
        <p className="bg-[#FFEECC] font-gochi text-2xl z-[22] px-4">
          from all around the globe
        </p>
      </div>
      <img
        src={frame1}
        alt="frame1"
        className="  absolute top-[2%] md:top-[5%] left-[-8%] md:left-[3%] lg:top-[5%]  lg:left-[15%]  -left-5 md:scale-[.8] scale-[.6]  lg:scale-[.7]  -z-10"
      />
      <img
        src={frame2}
        alt="frame2"
        className="  md:scale-[.7] md:scale-[.6] scale-[.5]   absolute  top-[-4%] right-[-5%] lg:top-[2%] lg:left-[74%] md:top-[8%] md:right-[4%]  md:block lg:block  -z-10 "
      />
      <img
        src={frame3}
        alt="frame3"
        className="absolute lg:top-[15%] lg:right-[0%] md:top-[15%] md:right-[10%] -top-3 right-2  md:scale-[.9] lg:scale-[.9] scale-[.7] opacity-[.5]  z-10 hidden lg:block "
      />
      <img
        src={frame4}
        alt="frame4"
        className="    scale-[.6] opacity-60 absolute lg:top-[25%] lg:left-[84%] md:top-[32%] md:left-[84%]     -z-[9] hidden lg:block "
      />
      <img
        src={frame5}
        alt="frame5"
        className="  absolute md:top-[25%] md:right-[22%] md:scale-[.6] lg:scale-[.7]  lg:top-[20%] lg:left-[33%]  opacity-40 -z-[9]   hidden md:block"
      />
      <img
        src={frame6}
        alt="frame6"
        className="   absolute md:top-[38%] md:left-[.5%] lg:top-[38%]  top-[25.5%] -left-2 -z-10 scale-[.7]   lg:left-[3%]"
      />
    </div>
  );
};

export default HeroBottom;

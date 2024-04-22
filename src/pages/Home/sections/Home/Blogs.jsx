import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import BlogCard from "../../../../components/landing/BlogCard";
import useGetBlogs from "../../../../constants/useGetBlogs.js";

const Blogs = () => {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [, setShowNextButton] = useState(true);

  const handleSlideChange = (swiper) => {
    setShowPrevButton(!swiper.isBeginning);
    setShowNextButton(!swiper.isEnd);
  };

  const { blogs, thumbBlog } = useGetBlogs(
    [
      {
        title: {
          rendered:
            "When NFT Passion Meets Educational Access &#8211; Community Power Unleashed!",
        },
        excerpt: {
          rendered:
            "<p>Last month, three purpose-driven communities showed the power of web3 when values align &#8211; one NFT marketplace leveraged its reach, a red-hot NFT project rallied its collectors, and a nonprofit gained runway to uplift youth through technology. It started when Better.Giving Alliance member BLCK MRKT, a generative art-focused NFT marketplace on Polygon, joined forces with [&hellip;]</p>\n",
        },
        slug: "nft-passion-meets-educational-access",
      },
      {
        title: { rendered: "Better Giving: A new chapter for Angel Giving" },
        excerpt: {
          rendered:
            "<p>In the world of philanthropy, names carry weight, history, and intention. So when a platform as renowned as Angel Giving decides to adopt a new name, it&#8217;s an event worthy of celebration and reflection. We are excited to announce that Angel Giving is evolving into &#8220;Better Giving&#8221;. This new name is not just a rebrand, [&hellip;]</p>\n",
        },
        slug: "better-giving-a-new-chapter-for-angel-giving",
      },
      {
        title: { rendered: "Why donate to a &#8216;Long Tail&#8217; Charity." },
        excerpt: {
          rendered:
            "<p>Why You Should Donate to Long Tail Charities Charities are not all equal. Some are big and well-known, with large donor bases and marketing budgets. Others are small and obscure, with limited resources and visibility. These are the long tail charities, and they deserve your attention and support. What are long tail charities? The term [&hellip;]</p>\n",
        },
        slug: "donate-long-tail-charity",
      },
      {
        title: {
          rendered:
            "Is an endowment a realistic or even a good idea for a charity? Big or small?",
        },
        excerpt: {
          rendered:
            "<p>In the realm of philanthropy, nonprofits of all sizes strive to make a meaningful and lasting impact.&nbsp; While the primary focus often lies on fundraising and immediate needs, it is crucial for nonprofits, even small ones, to consider the long-term stability and sustainability of their operations. Those immediate needs often get in the way of [&hellip;]</p>\n",
        },
        slug: "endowment-case-for-charities-big-or-small",
      },
      {
        title: {
          rendered:
            "Revolutionizing Giving: The Space Ape Society and Angel Giving",
        },
        excerpt: {
          rendered:
            "<p>How The Space Ape Society’s NFT community is revolutionizing giving and transforming lives with Angel Giving charitable donations. The Space Ape Society (TSAS) and their subcommunities, Crowned Space Apes (CSA) and Space Ape Cowboyz, have shown the power of the NFT space by using their project and community to create life-changing impact. As an essential [&hellip;]</p>\n",
        },
        slug: "revolutionizing-giving",
      },
      {
        title: {
          rendered:
            "Multisig Wallets: The what, the why and the Angel Giving how!",
        },
        excerpt: {
          rendered:
            "<p>It isn’t just the crypto world that needs financial security. Every charity will have heard of examples of financial mismanagement that go way back in time, and scammers try it on all the time. Fortunately, no charity in the Angel Giving world has lost funds in this way. But thieves will always keep trying. So, [&hellip;]</p>\n",
        },
        slug: "multisig-wallets-and-angel-giving",
      },
      {
        title: {
          rendered:
            "Impact and Innovation: Angel Giving&#8217;s April nonprofit newsletter.",
        },
        excerpt: {
          rendered:
            "<p>Spring has sprung! (well, for some at least&#8230;) In the Northern Hemisphere, spring is here &#8211; and spring is all about new beginnings. Plants are transformed from apparently lifeless roots under the ground to green shoots of life, or colourful buds that dot trees. Lambs and calves gambol in the fields and the strange warmth [&hellip;]</p>\n",
        },
        slug: "angel-giving-newsletter",
      },
      {
        title: {
          rendered:
            "The Sigmoid Curve and the Imperative for Charities and Non-Profits to Embrace Blockchain Technologies",
        },
        excerpt: {
          rendered:
            "<p>Charles Handy, the renowned management philosopher and well-known for the ‘Sigmoid Curve’ principle, once said, &#8220;The key to future success is to have the foresight and discipline to see the opportunities in what you are doing in the present cycle and then to make your moves while things are going well. If you act too [&hellip;]</p>\n",
        },
        slug: "the-sigmoid-curve-charities-blockchain",
      },
      {
        title: {
          rendered:
            "Validator Income and Expenditure Report: Q1 2023 &#8211; Angel Giving",
        },
        excerpt: {
          rendered:
            "<p>Overview: Angel Giving democratizes access to digital endowments for nonprofits. A large part of our vibrant, transparent charity marketplace is connecting capital flows to these changemakers in enduring and creative ways. Validator income and rewards are a cornerstone of this strategy. Operating a host of cross-chain validators, Angel Giving Validators support the decentralization of the [&hellip;]</p>\n",
        },
        slug: "validator-income-report-q1-2023-angel-giving",
      },
      {
        title: {
          rendered:
            "Angel Giving&#8217;s 10-Point Plan for Nonprofit Fundraising Success",
        },
        excerpt: {
          rendered:
            "<p>The Angel Giving 10-point plan: We believe that donors want to see just what is done with their hard-earned donation. For crypto donors, they definitely want more to be done with their crypto donation than just have it exchanged into fiat currency such as dollars or pounds. After all, they often believe cryptocurrencies and blockchain [&hellip;]</p>\n",
        },
        slug: "angel-givings-10-point-plan-crypto-success",
      },
    ],
    [
      "https://angelgiving-dev.10web.site/wp-content/uploads/2024/01/Screenshot-2024-01-18-at-10.41.49.png",
      "https://angelgiving-dev.10web.site/wp-content/uploads/2023/11/from_to_1.png",
      "https://angelgiving-dev.10web.site/wp-content/uploads/2023/07/long-tail-image.jpeg",
      "https://angelgiving-dev.10web.site/wp-content/uploads/2023/07/Power-of-an-Endowment.png",
      "https://angelgiving-dev.10web.site/wp-content/uploads/2023/05/revolutionizing-giving.png",
      "https://angelgiving-dev.10web.site/wp-content/uploads/2023/04/Multisig-banner-1.png",
      "https://angelgiving-dev.10web.site/wp-content/uploads/2023/03/Angel-Protocol-Website-Banners-8.png",
      "https://angelgiving-dev.10web.site/wp-content/uplo…s/2023/04/Angel_Protocol_-_Website_Banners_13.png",
      "https://angelgiving-dev.10web.site/wp-content/uploads/2023/04/32.png",
      "https://angelgiving-dev.10web.site/wp-content/uplo…s/2023/04/10-point-plan-non-profit-fundrasing.png",
    ]
  );

  return (
    <section className=" xl:px-[126px] lg:px-[60px] md:px-[30px] flex flex-col gap-[56px] py-[50px]  blogs relative z-10">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="156"
        height="286"
        viewBox="0 0 156 286"
        fill="none"
        className="absolute top-[40%] right-0"
      >
        <path
          opacity="0.4"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M36.6441 1.54872C50.4083 4.61319 59.0818 18.2574 56.0168 32.024C36.0944 121.507 92.472 210.194 181.94 230.113C271.407 250.032 360.086 193.64 380.008 104.157C383.073 90.3908 396.716 81.715 410.48 84.7795C424.244 87.844 432.918 101.488 429.853 115.255C403.8 232.271 287.837 306.015 170.84 279.967C53.8442 253.919 -19.8803 137.942 6.17203 20.9266C9.23702 7.16001 22.8798 -1.51575 36.6441 1.54872Z"
          fill="#FDE3D8"
        />
      </svg>
      <h2 className="text-[#183244] text-[32px] md:text-[42px] font-bold text-center font-heading">
        Check out the latest
      </h2>

      <div className="  relative  flex items-center  md:gap-3 xl:gap-4 lg:justify-between w-fit top-0 left-[50%]  translate-x-[-50%] h-full">
        <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] left-[-20%] blur-[100px] rounded-full"></div>

        <button
          className="prev lg:-mt-12 lg:relative  lg:top-[50%] lg:left-[0%] lg:translate-y-[-50%] lg:p-3 w-fit h-fit md:p-3  bg-white rounded-full borderLine shadow md:absolute md:top-1/2 md:translate-y-[-50%] md:left-[2%] z-10  top-[39.5%] translate-y-[-50%]  absolute left-[-5%]  p-3   md:block"
          style={{ opacity: showPrevButton ? 1 : 0 }}
        >
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
        <Swiper
          slidesPerView={"auto"}
          loop={true}
          speed={400}
          breakpoints={{
            768: {
              spaceBetween: 20,
              slidesPerView: 2,
              initialSlide: 2,
              centeredSlides: true,
            },
            300: {
              spaceBetween: 20,
              slidesPerView: 1,
              centeredSlides: true,
            },
            1100: {
              spaceBetween: 20,
              slidesPerView: 3,
            },
          }}
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
            clickable: true,
          }}
          onSlideChange={(swiper) => handleSlideChange(swiper)}
          modules={[Navigation]}
          className="blog_carousel"
        >
          {blogs.map((ele, idx) => {
            return (
              <SwiperSlide key={idx} className="w-[300px]">
                <BlogCard blog={ele} imgUrl={thumbBlog[idx]} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <button className="next lg:relative lg:-mt-12 lg:top-[50%] lg:right-[0%] lg:translate-y-[-50%] lg:p-3 md:p-3  bg-white rounded-full borderLine z-[777]  shadow-md md:absolute absolute md:top-1/2 md:right-[2%] top-[39.5%] translate-y-[-50%]  right-[-5%] p-3  md:block">
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

        <div className="hidden md:block lg:hidden absolute bg-white h-full w-[40%] z-[8] right-[-20%] blur-[100px] rounded-full "></div>
      </div>
    </section>
  );
};

export default Blogs;

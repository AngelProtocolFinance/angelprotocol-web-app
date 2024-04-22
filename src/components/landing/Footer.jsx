import React from "react";
import log from "../../assets/landing/logo.svg"
const Footer = () => {
  return (
    <footer className="flex flex-col   lg:gap-[80px] gap-[50px] pt-[50px]  font-body">
      <div className="flex flex-col lg:items-center  lg:justify-between  lg:flex-row md:flex-col px-[24px] lg:px-[65px] md:px-[30px] gap-[70px]  ">
        <div className="flex flex-col gap-[20px] lg:flex-col md:flex-row lg:max-w-[28%] lg:gap-6 md:gap-[30px] md:items-start md:justify-between">
         
          <div className=" lg:w-[250px] md:w-[280px] w-[300px]    lg:h-16 md:h-16 h-20 md:scale-[1] lg:scale-[1] scale-[.9]  lg:-ml-7 md:-ml-2  -mb-2">
            <img
              src={log}
              className=" w-full h-full object-cover object-center  "
              alt="logo"
            />
          </div>

          <p className="text-[14px] text[#3D5361] text-start break-words md:p-0  lg:w-[100%]   md:w-[70%] lg:ml-0 md:ml-6 font-normal  leading-2 -tracking-[.1px]">
            Better Giving simplifies giving with a free platform that lets
            nonprofits around the world easily receive any kind of donation. Our
            Sustainability Fund ensures donations keep supporting causes,
            offering lasting benefits without the hassle. Dedicated to helping
            nonprofits everywhere, we provide essential support and affordable
            fiscal sponsorship, empowering them to achieve their goals. Join us
            in making a difference with every donation, creating enduring impact
            for a better tomorrow.
          </p>
        </div>

        <div className="flex gap-[70px]  flex-wrap md:flex-nowrap lg:self-auto md:self-center lg:ml-[-10px] ">
          <div className="flex flex-col gap-5">
            <h6 className="text-base font-semibold text-[#4585bb] md:mb-0 -mb-2">
              Our Support
            </h6>
            <ul>
              <li className="text-[14px] text[##00000099] whitespace-nowrap font-normal opacity-90">
                Non-profits
              </li>
              <li className="text-[14px] text[##00000099] mt-4  whitespace-nowrap font-normal opacity-90">
                Giving Partners (CSR)
              </li>
              <li className="text-[14px] text[##00000099] mt-4 whitespace-nowrap font-normal opacity-90">
                Impact Board
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h6 className="text-base font-semibold text-[#4585bb] md:mb-0 -mb-2">
              Resources
            </h6>
            <ul>
              <li className="text-[14px] text[##00000099]  whitespace-nowrap font-normal opacity-90">
                About
              </li>
              <li className="text-[14px] text[##00000099] mt-4  whitespace-nowrap font-normal opacity-90">
                FAQs
              </li>
              <li className="text-[14px] text[##00000099] mt-4 whitespace-nowrap font-normal opacity-90">
                News
              </li>
            </ul>
          </div>
          <div className=" flex flex-col gap-5">
            <h6 className="text-base font-semibold text-[#4585bb] md:mb-0 -mb-2">
              Legal
            </h6>
            <ul>
              <li className="text-[14px] text[##00000099]  whitespace-nowrap font-normal opacity-90">
                Privacy Policy
              </li>
              <li className="text-[14px] text[##00000099] mt-4  whitespace-nowrap font-normal opacity-90">
                Terms of Use <br /> (Donors)
              </li>
              <li className="text-[14px] text[##00000099] mt-4 whitespace-nowrap font-normal opacity-90">
                Terms of Use <br /> (Non-Profits)
              </li>
            </ul>
          </div>
        </div>

        <div className="flex  flex-col gap-[24px] lg:ml-16 md:ml-0 lg:flex-col lg:gap-6 md md:flex-row md:justify-between">
          <span>
            <h6 className="text-base font-bold  text-[#4585bb] mb-1">
              Subscribe to our newsletter
            </h6>
            <p className="text-[12px] text[#647581] text-justify font-normal opacity-90 md:w-[100%] lg:w-[100%] w-[90%]">
              By subscribing to this newsletter you confirm that you <br /> have
              read and agree with our{" "}
              <span className="underline font-medium text-[#000] opacity-[1]">
                Privacy Policy.
              </span>
            </p>
          </span>
          <span className="flex flex-col md:items-start md:gap-[12px] gap-[12px] w-full  lg:w-full md:w-[45%]">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              className=" cursor-default text-[#000000] opacity-[.9] p-3 rounded-md font-normal border text-[15px] md:text-[13px] border-solid  border-[#0000001a] w-full"
            />
            <button className="bg-[#2D89C8] rounded-[40px] px-7 py-[11px] text-white text-sm text-[14px] font-medium">
              Subscribe
            </button>
          </span>
        </div>
      </div>

      <div className="lg:h-[64px] text-[#316B9C] font-medium    px-[24px] lg:px-[60px] py-[14px] flex justify-between items-center flex-col-reverse gap-[15px] lg:flex-row md:gap-[20px] bg-[#F1FAFF]">
        <p className=" text-[12px]   md:text-[15px] text-center ">
          <span className="">
            {" "}
            © Copyright 2023 Better.Giving, A Registered Charitable 501 (C) (3)
            (EIN 87-3758939)
          </span>
        </p>
        <span className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M13.6536 1.68799H16.1346L10.7144 7.88299L17.0909 16.313H12.0981L8.1876 11.2002L3.71313 16.313H1.23063L7.02813 9.68674L0.911133 1.68799H6.03063L9.56535 6.36124L13.6536 1.68799ZM12.7829 14.828H14.1576L5.28363 3.09499H3.80838L12.7829 14.828Z"
              fill="#316B9C"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M13.7524 13.7547H11.7533V10.6221C11.7533 9.87514 11.7381 8.91386 10.7115 8.91386C9.66924 8.91386 9.51002 9.72671 9.51002 10.567V13.7547H7.51089V7.31299H9.43127V8.19101H9.45714C9.72549 7.68476 10.378 7.15043 11.3528 7.15043C13.3784 7.15043 13.753 8.48359 13.753 10.2189L13.7524 13.7547ZM5.25304 6.43155C4.60954 6.43155 4.0926 5.91068 4.0926 5.26999C4.0926 4.62986 4.6101 4.10955 5.25304 4.10955C5.89429 4.10955 6.41404 4.62986 6.41404 5.26999C6.41404 5.91068 5.89373 6.43155 5.25304 6.43155ZM6.25541 13.7547H4.25066V7.31299H6.25541V13.7547ZM14.7525 2.25049H3.24716C2.69648 2.25049 2.25098 2.68586 2.25098 3.22305V14.778C2.25098 15.3156 2.69648 15.7505 3.24716 15.7505H14.7509C15.301 15.7505 15.751 15.3156 15.751 14.778V3.22305C15.751 2.68586 15.301 2.25049 14.7509 2.25049H14.7525Z"
              fill="#316B9C"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9.77132 1.50146C10.6154 1.50286 11.0431 1.50732 11.4127 1.51832L11.5583 1.52309C11.7264 1.52906 11.8923 1.53656 12.0923 1.54594C12.8904 1.58281 13.4348 1.70906 13.913 1.89469C14.4073 2.08531 14.8248 2.34281 15.2417 2.75969C15.6579 3.17656 15.9155 3.59531 16.1067 4.08844C16.2917 4.56594 16.418 5.11094 16.4555 5.90906C16.4644 6.10906 16.4716 6.27496 16.4775 6.44315L16.4822 6.58871C16.4932 6.95827 16.4982 7.38605 16.4998 8.2301L16.5004 8.78938C16.5005 8.85771 16.5005 8.92821 16.5005 9.00096L16.5004 9.21253L16.4999 9.7718C16.4985 10.6159 16.4941 11.0436 16.4831 11.4132L16.4783 11.5588C16.4723 11.7269 16.4648 11.8928 16.4555 12.0928C16.4186 12.8909 16.2917 13.4353 16.1067 13.9135C15.9161 14.4078 15.6579 14.8253 15.2417 15.2422C14.8248 15.6584 14.4054 15.916 13.913 16.1072C13.4348 16.2922 12.8904 16.4185 12.0923 16.456C11.8923 16.4649 11.7264 16.4721 11.5583 16.478L11.4127 16.4827C11.0431 16.4937 10.6154 16.4987 9.77132 16.5003L9.21204 16.5009C9.14372 16.501 9.07322 16.501 9.00047 16.501L8.78889 16.5009L8.22962 16.5004C7.38557 16.499 6.95778 16.4946 6.58822 16.4836L6.44266 16.4788C6.27447 16.4728 6.10857 16.4653 5.90858 16.456C5.11045 16.4191 4.5667 16.2922 4.08795 16.1072C3.5942 15.9166 3.17607 15.6584 2.7592 15.2422C2.34233 14.8253 2.08545 14.4059 1.8942 13.9135C1.70858 13.4353 1.58295 12.8909 1.54545 12.0928C1.53654 11.8928 1.52927 11.7269 1.52339 11.5588L1.51867 11.4132C1.5077 11.0436 1.50269 10.6159 1.50107 9.7718L1.50098 8.2301C1.50237 7.38605 1.50683 6.95827 1.51784 6.58871L1.5226 6.44315C1.52858 6.27496 1.53608 6.10906 1.54545 5.90906C1.58232 5.11031 1.70858 4.56657 1.8942 4.08844C2.08482 3.59469 2.34233 3.17656 2.7592 2.75969C3.17607 2.34281 3.59483 2.08594 4.08795 1.89469C4.56608 1.70906 5.10983 1.58344 5.90858 1.54594C6.10857 1.53703 6.27447 1.52976 6.44266 1.52387L6.58822 1.51916C6.95778 1.50818 7.38557 1.50318 8.22962 1.50156L9.77132 1.50146ZM9.00047 5.25094C6.92828 5.25094 5.25045 6.93059 5.25045 9.00096C5.25045 11.0731 6.9301 12.751 9.00047 12.751C11.0726 12.751 12.7505 11.0713 12.7505 9.00096C12.7505 6.92877 11.0708 5.25094 9.00047 5.25094ZM9.00047 6.75094C10.2431 6.75094 11.2505 7.75791 11.2505 9.00096C11.2505 10.2436 10.2434 11.251 9.00047 11.251C7.75779 11.251 6.75045 10.2439 6.75045 9.00096C6.75045 7.75828 7.75742 6.75094 9.00047 6.75094ZM12.938 4.12594C12.421 4.12594 12.0005 4.54587 12.0005 5.0628C12.0005 5.57973 12.4204 6.00031 12.938 6.00031C13.4549 6.00031 13.8755 5.58039 13.8755 5.0628C13.8755 4.54587 13.4542 4.12529 12.938 4.12594Z"
              fill="#316B9C"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M9.00099 1.50049C4.85884 1.50049 1.50098 4.85835 1.50098 9.00049C1.50098 12.744 4.24361 15.8467 7.82912 16.4094V11.1684H5.9248V9.00049H7.82912V7.34815C7.82912 5.46846 8.94879 4.43018 10.6619 4.43018C11.4825 4.43018 12.3408 4.57666 12.3408 4.57666V6.42236H11.3951C10.4634 6.42236 10.1729 7.00049 10.1729 7.59364V9.00049H12.2529L11.9204 11.1684H10.1729V16.4094C13.7583 15.8467 16.501 12.744 16.501 9.00049C16.501 4.85835 13.1431 1.50049 9.00099 1.50049Z"
              fill="#316B9C"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M14.4775 4.00336C13.4508 3.53376 12.3604 3.19151 11.2222 3.00049C11.0789 3.24723 10.9197 3.58152 10.8082 3.84418C9.59767 3.66907 8.3958 3.66907 7.20191 3.84418C7.09048 3.58152 6.92332 3.24723 6.78801 3.00049C5.64188 3.19151 4.55146 3.53376 3.53186 4.00336C1.4704 7.04382 0.913244 10.0126 1.19182 12.9417C2.56082 13.9366 3.88209 14.5415 5.18026 14.9395C5.49863 14.5097 5.78517 14.048 6.03191 13.5625C5.56231 13.3874 5.11658 13.1725 4.68678 12.9178C4.79821 12.8382 4.90965 12.7507 5.01312 12.6631C7.60785 13.8491 10.4183 13.8491 12.9811 12.6631C13.0926 12.7507 13.1961 12.8382 13.3075 12.9178C12.8777 13.1725 12.432 13.3874 11.9624 13.5625C12.2092 14.048 12.4957 14.5097 12.814 14.9395C14.1114 14.5415 15.4406 13.9366 16.8025 12.9417C17.1447 9.55106 16.2604 6.60609 14.4775 4.00336ZM6.39007 11.1349C5.61005 11.1349 4.9733 10.4265 4.9733 9.55901C4.9733 8.69141 5.59413 7.98304 6.39007 7.98304C7.17803 7.98304 7.82272 8.69141 7.80682 9.55901C7.80682 10.4265 7.17803 11.1349 6.39007 11.1349ZM11.6202 11.1349C10.8401 11.1349 10.2025 10.4265 10.2025 9.55901C10.2025 8.69141 10.8242 7.98304 11.6202 7.98304C12.4081 7.98304 13.0528 8.69141 13.0369 9.55901C13.0369 10.4265 12.4161 11.1349 11.6202 11.1349Z"
              fill="#316B9C"
            />
          </svg>
        </span>
      </div>
    </footer>
  );
};

export default Footer;

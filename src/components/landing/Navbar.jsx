import { DappLogo } from "components/Image";
import { appRoutes } from "constants/routes";
import React, { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [, setSearch] = useState("");

  return (
    <>
      <nav
        data-testid="nav_dropdown"
        className="bg-white lg:h-[68px] h-[68px] relative rounded-[40px] flex justify-between items-center  lg:px-4 md:px-4 xl:px-5 px-5 md:w-full lg:w-full  font-heading m-auto overflow-hidden"
        id="temp"
      >
        <DappLogo classes="w-48 h-12" />

        <label
          htmlFor="search"
          className=" search lg:w-[33%] absolute lg:left-[520px] md:left-[220px] sm:w-[0%] md:w-[35%] w-[8%] h-full flex items-center  gap-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 20 20"
            className="cursor-pointer"
            fill="none"
          >
            <path
              d="M15.0262 13.8473L18.0058 16.827C18.3313 17.1524 18.3313 17.68 18.0058 18.0055C17.6804 18.3309 17.1528 18.3309 16.8273 18.0055L13.8477 15.0258C12.5644 16.0525 10.937 16.6666 9.16699 16.6666C5.02699 16.6666 1.66699 13.3066 1.66699 9.16663C1.66699 5.02663 5.02699 1.66663 9.16699 1.66663C13.307 1.66663 16.667 5.02663 16.667 9.16663C16.667 10.9366 16.0528 12.564 15.0262 13.8473ZM13.3542 13.229C14.3732 12.1788 15.0003 10.7463 15.0003 9.16663C15.0003 5.94371 12.3899 3.33329 9.16699 3.33329C5.94408 3.33329 3.33366 5.94371 3.33366 9.16663C3.33366 12.3895 5.94408 15 9.16699 15C10.7467 15 12.1792 14.3729 13.2293 13.3539L13.3542 13.229Z"
              fill="#A2A3A3"
            />
          </svg>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Explore Non Profits"
            onChange={(e) => setSearch(e.target.value)}
            className="w-[85%] p-1 outline-none relative hidden md:block"
          />
        </label>

        <span className="md:flex h-full relative lg:w-[240px] flex justify-end items-center md:w-[220px] gap-3 items-center hidden">
          <Link
            className="px-2.5 pt-1.5 pb-2.5 rounded-[40px] font-bold text-[#183244] text-base text-lg"
            to={appRoutes.signin}
          >
            Login
          </Link>
          <Link
            className="bg-[#2D89C8] text-white px-6 pt-1.5 pb-2.5 rounded-[40px] font-semibold text-lg"
            to={appRoutes.signup}
          >
            Sign up
          </Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="flex w-[10%] md:hidden"
        >
          <g mask="url(#mask0_1054_12147)">
            <path
              d="M4.25 17.6347C4.0375 17.6347 3.85938 17.5628 3.71563 17.419C3.57188 17.2751 3.5 17.0969 3.5 16.8844C3.5 16.6718 3.57188 16.4937 3.71563 16.3501C3.85938 16.2065 4.0375 16.1347 4.25 16.1347H19.75C19.9625 16.1347 20.1406 16.2066 20.2843 16.3504C20.4281 16.4942 20.5 16.6724 20.5 16.885C20.5 17.0976 20.4281 17.2757 20.2843 17.4193C20.1406 17.5629 19.9625 17.6347 19.75 17.6347H4.25ZM4.25 12.7501C4.0375 12.7501 3.85938 12.6782 3.71563 12.5344C3.57188 12.3905 3.5 12.2123 3.5 11.9998C3.5 11.7872 3.57188 11.6091 3.71563 11.4655C3.85938 11.3219 4.0375 11.2501 4.25 11.2501H19.75C19.9625 11.2501 20.1406 11.322 20.2843 11.4658C20.4281 11.6096 20.5 11.7878 20.5 12.0004C20.5 12.213 20.4281 12.3911 20.2843 12.5347C20.1406 12.6783 19.9625 12.7501 19.75 12.7501H4.25ZM4.25 7.86545C4.0375 7.86545 3.85938 7.79355 3.71563 7.64973C3.57188 7.50593 3.5 7.32773 3.5 7.11513C3.5 6.90254 3.57188 6.72446 3.71563 6.58088C3.85938 6.43728 4.0375 6.36548 4.25 6.36548H19.75C19.9625 6.36548 20.1406 6.43739 20.2843 6.5812C20.4281 6.72502 20.5 6.90322 20.5 7.1158C20.5 7.3284 20.4281 7.50649 20.2843 7.65008C20.1406 7.79366 19.9625 7.86545 19.75 7.86545H4.25Z"
              fill="#A2A3A3"
            />
          </g>
        </svg>
      </nav>
    </>
  );
};

export default Navbar;

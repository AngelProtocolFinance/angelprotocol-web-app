import AppMenu from "components/NavMenus/AppMenu";
import { Link } from "react-router-dom";
export default function AppFoot() {
  return (
    <footer className="w-full grid place-items-center max-h-28 bg-gray-900">
      <div className="w-full  py-2 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between padded-container">
        <nav className="flex lg:items-center mb-2 lg:mb-0 lg:order-2">
          <AppMenu />
        </nav>
        <div className="flex flex-col items-center">
          <Link
            to="/ap-litepaper.pdf"
            className="mt-2 mb-1 font-semibold text-xs uppercase text-white-grey text-center"
            target="_blank"
            download
          >
            Download Litepaper
          </Link>
          <p className="text-white-grey text-center text-xs uppercase lg:order-1 lg:text-left ">
            Copyright 2021 Angel Protocol. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

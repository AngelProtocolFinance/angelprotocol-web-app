import AppMenu from "components/NavMenus/AppMenu";
import litePaper from "assets/docs/ap-litepaper.pdf";

export default function AppFoot() {
  return (
    <footer className="fixed bottom-0 w-full grid place-items-center bg-gray-900 h-24 lg:h-16">
      <div className="w-full px-5 py-2 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between xl:container xl:mx-auto ">
        <nav className="flex lg:items-center mb-2 lg:mb-0 lg:order-2">
          <AppMenu />
        </nav>
        <div className="flex flex-col items-center">
          <a
            href={litePaper}
            className="mt-2 mb-1 font-semibold text-xs uppercase text-white-grey text-center"
            target="_blank"
            rel="noreferrer noopener"
            download="AP Litepaper"
          >
            Download Litepaper
          </a>
          <p className="text-white-grey text-center text-xs uppercase lg:order-1 lg:text-left ">
            Copyright 2021 Angel Protocol. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}

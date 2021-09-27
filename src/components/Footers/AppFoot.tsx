import AppMenu from "components/NavMenus/AppMenu";

export default function AppFoot() {
  return (
    <footer className="fixed bottom-0 w-full grid place-items-center bg-gray-900 h-20 lg:h-12">
      <div className="w-full px-5 py-2 flex flex-col items-center lg:flex-row lg:items-center lg:justify-between xl:container xl:mx-auto ">
        <nav className="flex lg:items-center mb-2 lg:mb-0 lg:order-2">
          <AppMenu />
        </nav>
        <p className="text-white-grey text-center text-xs uppercase lg:order-1 lg:text-left ">
          Copyright 2021 Angel Protocol. All rights reserved
        </p>
      </div>
    </footer>
  );
}

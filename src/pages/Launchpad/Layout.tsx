import { Outlet } from "react-router-dom";
import Progress from "./Progress";

export default function Layout({ classes = "" }) {
  return (
    <div
      className={`w-full h-50 md:w-[90%] max-w-[62.5rem] md:py-8 grid md:grid-cols-[auto_1fr] md:border border-prim rounded-none md:rounded-lg bg-white dark:bg-blue-d6 ${classes}`}
    >
      <Progress classes="mx-6 md:ml-8 md:min-w-[12rem] lg:min-w-[15.5rem]" />
      <div className="grid z-10 w-full px-6 py-8 md:p-0 md:pr-8 md:shadow-none shadow-[0px_-5px_5px_0px] shadow-gray-l3/80 dark:shadow-blue-d7">
        <Outlet />
      </div>
    </div>
  );
}

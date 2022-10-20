import ContentLoader from "components/ContentLoader";
import Loader from "components/Loader";

export default function Skeleton() {
  return (
    <section className="sm:hidden flex flex-col items-center isolate relative w-full h-full">
      <Banner />
      <Body />

      <Logo className="absolute left-auto top-24 z-10" />
    </section>
  );
}

function Banner() {
  return (
    <div className="flex items-center justify-center h-60 w-full bg-blue dark:bg-blue-d4">
      <Loader bgColorClass="bg-white/80" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}

function Body() {
  return (
    <div className="w-full h-full bg-white dark:bg-blue-d5 flex flex-col gap-10 pt-6 pb-20 px-20">
      <ContentLoader className="w-full h-56" />
      <ContentLoader className="w-full h-72" />
      <ContentLoader className="w-full h-96" />
      <ContentLoader className="w-full h-96" />
    </div>
  );
}

function Logo({ className = "" }: { className: string }) {
  return (
    <div
      className={`${className} box-border h-44 w-44 rounded-full bg-blue-l3 object-contain dark:bg-blue`}
    >
      <Loader bgColorClass="bg-white/80" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}

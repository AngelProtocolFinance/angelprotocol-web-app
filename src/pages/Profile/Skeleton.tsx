import ContentLoader from "components/ContentLoader";
import Loader from "components/Loader";

export default function Skeleton() {
  return (
    <section className="flex flex-col items-center isolate relative w-full h-full">
      <Banner />
      <Body />

      <Logo className="absolute left-auto top-32 sm:left-20 sm:top-48" />
    </section>
  );
}

function Banner() {
  return (
    <div className="flex items-center justify-center h-60 w-full bg-blue dark:bg-blue-d3 sm:h-72" />
  );
}

function Body() {
  return (
    <div className="w-full bg-white dark:bg-blue-d5 flex flex-col gap-5 px-6 pt-24 pb-8 sm:pt-6 sm:pb-20 sm:px-20 sm:items-end">
      <ContentLoader className="h-56 sm:w-1/2 sm:h-28" />
      <ContentLoader className="w-full h-72 sm:h-28" />
      <div className="flex flex-col gap-10 w-full h-full sm:flex-row sm:gap-8">
        <ContentLoader className="w-full h-96 sm:h-[905px]" />
        <ContentLoader className="w-full h-96 sm:w-[405px] sm:h-[905px]" />
      </div>
    </div>
  );
}

function Logo({ className = "" }: { className: string }) {
  return (
    <div
      className={`${className} box-border h-40 w-40 sm:h-44 sm:w-44 rounded-full bg-blue-l3 object-contain dark:bg-blue`}
    >
      <Loader bgColorClass="bg-white/80" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}

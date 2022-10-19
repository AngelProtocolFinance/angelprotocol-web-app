import ContentLoader from "components/ContentLoader";
import Loader from "components/Loader";

export default function Skeleton() {
  return (
    <section className="hidden sm:flex flex-col items-center isolate relative w-full h-full">
      <Banner />
      <Body />

      <div className="absolute left-20 top-36">
        <Logo />
      </div>
    </section>
  );
}

function Banner() {
  return (
    <div className="flex items-center justify-center h-72 w-full bg-blue dark:bg-blue-d4">
      <Loader bgColorClass="bg-white/80" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}

function Body() {
  return (
    <div className="w-full h-full bg-white dark:bg-blue-d5 flex pt-6 pb-20 px-20">
      <div className="flex flex-col gap-10 w-full h-full">
        <div className="w-full h-52 grid grid-rows-2 gap-4">
          <ContentLoader className="w-2/5 h-full justify-self-end" />
          <ContentLoader className="w-full h-full" />
        </div>
        <div className="flex gap-8 w-full h-full">
          <ContentLoader className="w-full h-[905px]" />
          <ContentLoader className="w-[405px] h-[905px]" />
        </div>
      </div>
    </div>
  );
}

function Logo() {
  return (
    <div className="box-border h-44 w-44 rounded-full bg-blue-l3 object-contain dark:bg-blue">
      <Loader bgColorClass="bg-white/80" gapClass="gap-2" widthClass="w-4" />
    </div>
  );
}

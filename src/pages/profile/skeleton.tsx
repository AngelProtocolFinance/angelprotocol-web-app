import ContentLoader from "components/content-loader";

export default function Skeleton() {
  return (
    <section className="pb-8">
      <Banner />

      <div className="w-full padded-container grid lg:grid-cols-[4fr_2fr] gap-6 content-start">
        <Logo className="col-span-full" />
        {/** header */}
        <ContentLoader className="h-40 lg:h-20 mt-20 col-span-full" />
        {/** content */}
        <ContentLoader className="h-72" />
        <ContentLoader className="h-72 lg:col-start-1" />
        {/** balances */}
        <div className="grid gap-y-4 lg:col-start-2 lg:row-start-3 lg:row-span-2 self-start">
          <ContentLoader className="h-32" />
          <ContentLoader className="h-32" />
          <ContentLoader className="h-32" />
        </div>
      </div>
    </section>
  );
}

function Banner() {
  return (
    <div className="flex items-center justify-center h-60 w-full bg-blue dark:bg-blue-d3 sm:h-72" />
  );
}

function Logo({ className = "" }) {
  return (
    <div
      className={`h-0 relative flex max-lg:justify-center items-center ${className}`}
    >
      <div className="h-40 w-40 sm:h-44 sm:w-44 rounded-full bg-blue-l3 dark:bg-blue" />
    </div>
  );
}

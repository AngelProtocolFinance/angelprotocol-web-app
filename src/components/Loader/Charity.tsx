import ContentLoader from "components/ContentLoader/ContentLoader";

export const CharityProfileTabLoader = () => (
  <div className="flex flex-col grid-rows-1 items-start w-full md:mx-auto md:container min-h-r15 gap-2 lg:mt-3 pt-5">
    <ContentLoader height="50" />
    <div className="mt-5"></div>
    <ContentLoader height="180" />
    <div className="flex flex-col grid-rows-1 md:grid-rows-2 md:flex-row items-start w-full md:mx-auto md:container gap-1 md:gap-2 pt-5">
      <ContentLoader height="180" />
      <ContentLoader height="180" />
    </div>
  </div>
);

export const DonationStatsLoader = () => (
  <div className="mt-28">
    <ContentLoader height="20" width="50%" />
    <div className="mt-1"></div>
    <ContentLoader height="20" width="80%" />
    <div className="mt-6"></div>
    <ContentLoader height="20" width="50%" />
    <div className="mt-1"></div>
    <ContentLoader height="20" width="80%" />
    <div className="mt-6"></div>
    <ContentLoader height="20" width="50%" />
    <div className="mt-1"></div>
    <ContentLoader height="20" width="80%" />
    <div className="mt-6"></div>
    <ContentLoader height="20" width="50%" />
    <div className="mt-1"></div>
    <ContentLoader height="20" width="80%" />
    <div className="mt-6"></div>
    <ContentLoader height="20" width="50%" />
    <div className="mt-1"></div>
    <ContentLoader height="20" width="80%" />
  </div>
);

export const DonationInfoLoader = () => (
  <div className="flex flex-col xl:w-128 2xl:min-h-1/2 bg-transparent px-0 2xl:px-10 mt-10 lg:mt-0 2xl:mt-0">
    <ContentLoader height="20" width="60%" />
    <div className="mt-5"></div>
    <ContentLoader height="60" width="80%" />
    <div className="mt-5"></div>
    <ContentLoader height="40" width="80%" />
  </div>
);

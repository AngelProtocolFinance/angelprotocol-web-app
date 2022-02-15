import Index from "./Index";
import Loader from "components/Loader/Loader";
import { useCategorizedProfiles } from "services/aws/endowments/queriers";

export default function Market() {
  const { categorizedProfiles, isProfilesLoading } = useCategorizedProfiles();

  return (
    <div className="grid grid-rows-dashboard pb-16">
      <div className="flex flex-col-reverse md:flex-row padded-container md:py-20 gap-5">
        <div className="relative w-full md:w-1/2 my-auto">
          <figure>
            <img
              src="https://charity-profile-images.s3.amazonaws.com/banner/The+5+Gyres+Institute.png"
              alt=""
              className="w-150 rounded-lg"
            />
            <figcaption className="text-white font-bold uppercasetext-left py-4">
              <div className="pb-2 text-2xl md:text-3xl">
                The 5 Gyres Institute
              </div>
              <div className="text-md md:text-lg">
                SDG #12: Responsible Consumption and Production
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="text-white w-full md:w-1/2 my-auto">
          <p className="font-extrabold text-6xl md:text-7xl lg:text-8xl">
            GIVE ONCE,
          </p>
          <p className="font-extrabold text-6xl md:text-7xl lg:text-8xl text-angel-orange mb-4">
            GIVE FOREVER.
          </p>
          <p className="text-2xl md:text-3xl my-4">
            <span className="font-bold">
              Want to empower a charity like The 5 Gyres Institute with
              financial freedom?
            </span>{" "}
            Find a charity from the list below, connect your wallet and donate
            to their perpetual endowment.
          </p>
        </div>
      </div>
      {(isProfilesLoading && (
        <div className="h-40 bg-opacity-5 rounded-lg grid place-items-center">
          <Loader
            bgColorClass="bg-white-grey bg-opacity-80"
            gapClass="gap-2"
            widthClass="w-4"
          />
        </div>
      )) || (
        <section className="flex-auto padded-container mx-auto mt-5">
          {Object.entries(categorizedProfiles).map(([sdg_number, profiles]) => (
            <Index key={sdg_number} id={+sdg_number} profiles={profiles} />
          ))}
        </section>
      )}
    </div>
  );
}

import Breadcrumbs from "components/Breadcrumbs";
import VerifiedIcon from "components/VerifiedIcon";
import { appRoutes } from "constants/routes";
import { useFundContext } from "../FundContext";
import DonateButton from "./DonateButton";
import GeneralInfo from "./GeneralInfo";

export function Body() {
  const p = useFundContext();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="padded-container grid gap-8 justify-items-center w-full h-full pt-32 pb-8 lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[1fr_auto] lg:justify-items-start lg:gap-16 lg:pt-6 lg:pb-20">
        <Breadcrumbs
          className="font-normal text-xs sm:text-sm lg:ml-52"
          items={[
            {
              title: "Funds",
              to: `${appRoutes.funds}/`,
              end: true,
            },
            { title: p.name, to: `${appRoutes.funds}/${p.id}` },
          ]}
        />
        <DonateButton className="order-3 lg:order-2 w-full lg:w-48" />

        <div className="order-2 lg:order-3 lg:col-span-2 flex flex-col gap-8 w-full items-center">
          <div className="flex flex-col items-center lg:items-start w-full gap-2 text-center lg:text-left">
            <div className="flex max-sm:flex-col items-center gap-3">
              <h3 className="font-header text-3xl w-full max-w-2xl break-words">
                {p.verified && (
                  <VerifiedIcon
                    classes="relative inline bottom-px mr-2"
                    size={24}
                  />
                )}
                <span>{p.name}</span>
                {!p.active && (
                  <span className="ml-2 px-3 py-1 text-2xs bg-red-l4 text-red relative inline bottom-1 uppercase rounded-full">
                    closed
                  </span>
                )}
              </h3>
            </div>

            <pre className="w-full font-normal text-lg">
              {p.members.map((m) => `${m.id}:${m.name}`).join()}
            </pre>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center w-full font-semibold text-base">
            <span>info 1</span>
            <span>info 2</span>
            <span>info 3</span>
          </div>
        </div>

        <GeneralInfo className="order-4 lg:col-span-2 w-full h-full" />
      </div>
    </div>
  );
}

import { Route, Routes } from "react-router-dom";
import BookmarkBtn from "components/BookmarkBtn";
import Breadcrumbs from "components/Breadcrumbs";
import ExtLink from "components/ExtLink";
import Icon from "components/Icon";
import { IS_AST } from "constants/env";
import { appRoutes } from "constants/routes";
import { useProfileContext } from "../ProfileContext";
import DonateButton from "./DonateButton";
import GeneralInfo from "./GeneralInfo";
import Program from "./Program";

export default function Body() {
  const p = useProfileContext();

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="padded-container grid gap-8 justify-items-center w-full h-full pt-32 pb-8 lg:grid-rows-[auto_auto_1fr] lg:grid-cols-[1fr_auto] lg:justify-items-start lg:gap-16 lg:pt-6 lg:pb-20">
        <Breadcrumbs
          className="font-body font-normal text-xs sm:text-sm lg:ml-52"
          items={
            IS_AST
              ? []
              : [
                  { title: "Marketplace", to: appRoutes.marketplace },
                  { title: p.name, to: `${appRoutes.profile}/${p.id}` },
                ]
          }
        />
        <DonateButton className="order-3 lg:order-2 w-full lg:w-48" />

        <div className="order-2 lg:order-3 lg:col-span-2 flex flex-col gap-8 w-full items-center font-body">
          <div className="flex flex-col items-center lg:items-start w-full gap-2 text-center lg:text-left">
            <div className="flex max-sm:flex-col items-center gap-3">
              <h3 className="font-header text-3xl w-full max-w-2xl break-all sm:break-words">
                {p.name}
              </h3>
              <BookmarkBtn endowId={p.id} />
            </div>
            <p className="w-full font-normal text-lg">{p.tagline}</p>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-center w-full font-semibold text-base">
            {p.hq_country && (
              <span className="flex items-center gap-2 uppercase">
                <Icon type="MapPin" className="h-6 w-6 text-orange" />
                {p.hq_country}
              </span>
            )}
            {p.url && (
              <span className="flex items-center gap-2">
                <Icon type="Globe" className="h-6 w-6 text-orange" />
                <ExtLink
                  href={p.url}
                  title="organization website"
                  className="cursor-pointer underline decoration-1 hover:text-orange hover:decoration-2"
                >
                  {p.url.replace(/^https?:\/\//i, "")}
                </ExtLink>
              </span>
            )}
          </div>
        </div>

        <Routes>
          <Route
            index
            element={
              <GeneralInfo className="order-4 lg:col-span-2 w-full h-full" />
            }
          />
          <Route
            path="program/:id"
            element={
              <Program className="order-4 lg:col-span-2 w-full h-full" />
            }
          />
        </Routes>
      </div>
    </div>
  );
}

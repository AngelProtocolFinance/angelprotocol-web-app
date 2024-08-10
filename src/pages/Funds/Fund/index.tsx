import fallback_banner from "assets/images/fallback-banner.png";
import flying_character from "assets/images/flying-character.png";
import Image from "components/Image";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";

import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "react-router-dom";
import { useFundQuery } from "services/aws/funds";
import { Body } from "./Body";
import { FundContext } from "./FundContext";
import PageError from "./PageError";
import Skeleton from "./Skeleton";

export function Component() {
  const { fundId = "" } = useParams();
  const { isLoading, isError, data } = useFundQuery(fundId || skipToken);

  if (isLoading) return <Skeleton />;
  if (isError || !data) return <PageError />;

  return (
    <FundContext.Provider value={data}>
      <Seo
        title={`${data.name} - ${APP_NAME}`}
        description={data.description.slice(0, 140)}
        name={data.name}
        image={data.logo || flying_character}
        url={`${BASE_URL}/profile/${data.id}`}
      />
      <section className="grid grid-rows-[auto_auto_1fr] items-center isolate w-full h-full">
        <div
          className="relative w-full h-52 sm:h-72 bg-cover bg-center"
          style={{
            backgroundImage: `url('${data.banner || fallback_banner}')`,
          }}
        />
        <div className="padded-container flex justify-center items-center w-full overflow-visible h-0 isolate lg:justify-start">
          <Image
            src={data.logo || flying_character}
            className="h-48 w-48 border border-gray-l4 rounded-full object-cover bg-white"
          />
        </div>
        <Body />
      </section>
    </FundContext.Provider>
  );
}

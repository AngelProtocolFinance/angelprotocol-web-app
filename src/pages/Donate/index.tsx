import type { DonateData } from "api/donate-loader";
import Seo from "components/Seo";
import { APP_NAME, BASE_URL } from "constants/env";
import { useLoaderData } from "react-router-dom";
import Content from "./Content";
export { loader } from "api/donate-loader";
export function Component() {
  const { intent, endow } = useLoaderData() as DonateData;

  return (
    <>
      <Seo
        title={`Donate to ${endow.name} - ${APP_NAME}`}
        description={endow.tagline?.slice(0, 140)}
        name={endow.name}
        image={endow.logo}
        url={`${BASE_URL}/donate/${endow.id}`}
      />
      <Content endowment={endow} intent={intent} />
    </>
  );
}

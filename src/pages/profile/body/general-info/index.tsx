import { DonorMsgs } from "components/donor-msgs";
import { RichText } from "components/rich-text";
import { richTextStyles } from "components/rich-text";
import { CacheRoute, createClientLoaderCache } from "remix-client-cache";
import { Container } from "../common/container";
import type { Route } from "./+types";
import { DetailsColumn } from "./details-column";
import { Fundraisers } from "./fundraisers";
import Media from "./media";
import Programs from "./programs";

export { loader } from "./api";
export const clientLoader = createClientLoaderCache<Route.ClientLoaderArgs>();
export { ErrorBoundary } from "components/error";
export const links: Route.LinksFunction = () => [...richTextStyles];

export default CacheRoute(Page);
export function Page({ loaderData, params }: Route.ComponentProps) {
  const { npo, programs, media, funds, bal_ltd } = loaderData;

  return (
    <div className="order-4 lg:col-span-2 grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]">
      <div className="flex flex-col gap-8 w-full h-full">
        <Container title="Overview">
          <RichText
            content={{ value: npo.overview ?? "" }}
            classes={{ field: "w-full h-full px-8 py-10" }}
            readOnly
          />
        </Container>
        {programs.length > 0 ? (
          <Container title="Programs">
            <Programs programs={programs} />
          </Container>
        ) : null}

        {media.length > 0 ? (
          <Container title="Media">{<Media media={media} />}</Container>
        ) : null}
        <DonorMsgs id={params.id} />
      </div>
      <DetailsColumn
        bal_ltd={bal_ltd}
        npo={npo}
        classes="self-start lg:sticky lg:top-[5.5rem]"
        fundraisers={
          funds.length > 0 ? <Fundraisers classes="mt-4" funds={funds} /> : null
        }
      />
    </div>
  );
}

import { ContentLoader } from "components/content-loader";
import { DonorMsgs } from "components/donor-msgs";
import { RichText } from "components/rich-text";
import { Target, to_target } from "components/target";
import { Suspense } from "react";
import { Await, useOutletContext } from "react-router";
import type { Route } from "../../+types";
import { Container } from "../common/container";
import { DetailsColumn } from "./details-column";
import { Fundraisers } from "./fundraisers";
import Media from "./media";
import Programs from "./programs";

export default function Page() {
  const x = useOutletContext<Route.ComponentProps["loaderData"]>();
  const { npo, programs, media, funds, bal } = x;

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
        <Suspense fallback={<ContentLoader className="h-40" />}>
          <Await resolve={programs}>
            {(p) =>
              p.length > 0 ? (
                <Container title="Programs">
                  <Programs programs={p} />
                </Container>
              ) : null
            }
          </Await>
        </Suspense>

        <Suspense fallback={<ContentLoader className="h-40" />}>
          <Await resolve={media}>
            {(m) =>
              m.length > 0 ? (
                <Container title="Media">
                  <Media media={m} />
                </Container>
              ) : null
            }
          </Await>
        </Suspense>

        <DonorMsgs id={npo.id.toString()} />
      </div>
      <DetailsColumn
        target={
          <Suspense fallback={<ContentLoader className="h-40 mt-4" />}>
            <Await resolve={bal}>
              {(b) =>
                npo.target && (
                  <Target
                    text={<Target.Text classes="mb-2" />}
                    progress={b.ltd}
                    target={to_target(npo.target)}
                    classes="-mb-5 mt-4"
                  />
                )
              }
            </Await>
          </Suspense>
        }
        npo={npo}
        classes="self-start lg:sticky lg:top-[5.5rem]"
        fundraisers={
          <Suspense fallback={<ContentLoader className="h-40 mt-4" />}>
            <Await resolve={funds}>
              {(f) =>
                f.length > 0 ? <Fundraisers classes="mt-4" funds={f} /> : null
              }
            </Await>
          </Suspense>
        }
      />
    </div>
  );
}

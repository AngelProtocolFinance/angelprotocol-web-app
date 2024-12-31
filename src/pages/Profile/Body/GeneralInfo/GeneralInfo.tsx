import type { IMedia, Program } from "@better-giving/endowment";
import { RichText } from "components/RichText";
import { useLoaderData } from "react-router";
import { useProfileContext } from "../../ProfileContext";
import Container from "../common/Container";
import DetailsColumn from "./DetailsColumn";
import Media from "./Media";
import Programs from "./Programs";

export default function GeneralInfo() {
  const profile = useProfileContext();
  const [programs, media] = useLoaderData() as [Program[], IMedia[]];

  return (
    <div className="order-4 lg:col-span-2 grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]">
      <div className="flex flex-col gap-8 w-full h-full">
        <Container title="Overview">
          <RichText
            content={{ value: profile.overview ?? "" }}
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
          <Container title="Media">
            <Media media={media} />
          </Container>
        ) : null}
      </div>
      <DetailsColumn className="self-start lg:sticky lg:top-[5.5rem]" />
    </div>
  );
}

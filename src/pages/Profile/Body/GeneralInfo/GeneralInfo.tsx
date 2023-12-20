import RichText from "components/RichText";
import { isEmpty } from "helpers";
import { useProfileContext } from "../../ProfileContext";
import Container from "../common/Container";
import DetailsColumn from "./DetailsColumn";
import Programs from "./Programs";

export default function GeneralInfo({ className = "" }) {
  const profile = useProfileContext();
  return (
    <div
      className={`${className} grid grid-rows-[auto_auto] gap-8 w-full h-full lg:grid-rows-1 lg:grid-cols-[1fr_auto]`}
    >
      <div className="flex flex-col gap-8 w-full h-full">
        <Container title="Overview">
          <RichText
            content={profile.overview}
            classes={{ container: "w-full h-full px-8 py-10" }}
            readOnly
          />
        </Container>
        {!isEmpty(profile.program) && (
          <Container title="Programs">
            <Programs />
          </Container>
        )}
      </div>
      <DetailsColumn className="self-start lg:sticky lg:top-28" />
    </div>
  );
}

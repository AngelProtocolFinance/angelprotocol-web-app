import ImageWrapper from "components/ImageWrapper/ImageWrapper";
import { Profile } from "services/aws/endowments/types";
import CharityNav from "./CharityNav";
import CharityTabs from "./CharityTabs/CharityTabs";

export default function CharityContent(props: Profile & { classes?: string }) {
  return (
    <div className={`${props.classes || ""} w-full`}>
      <ImageWrapper
        src={props.charity_image}
        alt="charity image"
        className="row-start-2 row-span-6 w-full h-[300px] rounded-2xl shadow-md object-cover object-center"
      />
      <CharityNav />
      <CharityTabs />
    </div>
  );
}

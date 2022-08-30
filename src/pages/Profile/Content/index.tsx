import { Profile } from "types/contracts";
import ImageWrapper from "components/ImageWrapper";
import CharityNav from "./Nav";
import CharityTabs from "./Tabs";

export default function CharityContent(props: Profile & { classes?: string }) {
  return (
    <div className={`${props.classes || ""} w-full`}>
      <ImageWrapper
        src={props.image}
        alt="charity image"
        className="w-full h-[300px] rounded-2xl shadow-md object-cover object-center"
      />
      <CharityNav />
      <CharityTabs />
    </div>
  );
}

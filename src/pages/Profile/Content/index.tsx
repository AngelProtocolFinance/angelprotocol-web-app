import { ProfileResponse } from "types/contracts";
import ImageWrapper from "components/ImageWrapper";
import Nav from "./Nav";
import Tabs from "./Tabs";

export default function Content(props: ProfileResponse & { classes?: string }) {
  return (
    <div className={`${props.classes || ""} w-full`}>
      <ImageWrapper
        src={props.image}
        alt="endowment image"
        className="w-full h-[300px] rounded-2xl shadow-md object-cover object-center"
      />
      <Nav />
      <Tabs />
    </div>
  );
}

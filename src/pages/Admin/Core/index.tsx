import Nav from "./Nav";
import Views from "./Views";

export default function Core() {
  return (
    <div className="padded-container grid grid-rows-[auto_1fr] pb-8 pt-4 gap-2 font-work">
      <Nav />
      <Views />
    </div>
  );
}

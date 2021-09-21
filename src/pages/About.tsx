import Tweets from "./Home/Tweets";
import TypeWritter from "./Home/TypeWritter";

export default function About() {
  return (
    <div className="flex justify-center items-center px-5">
      <h1 className="text-white text-9xl">ABOUT</h1>
      <Tweets />
      <TypeWritter />
    </div>
  );
}

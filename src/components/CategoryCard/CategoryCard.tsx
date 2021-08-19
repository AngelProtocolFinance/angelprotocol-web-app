import { PropType } from "./types";
import no_provery_img from "../../assets/images/unsdg-no-poverty.png";

export default function CategoryCard({ title, description }: PropType) {
  return (
    <div className="w-60 text-white p-1 pt-6 border-t border-white border-opacity-40">
      <img
        src={no_provery_img}
        className="w-36 h-16 img-no-drag"
        alt="icon representing category"
      />
      <h1 className="font-bold text-2xl uppercase">{title}</h1>
      <p className="text-xs mb-1.5">{description}</p>
      <button className="w-48 uppercase bg-yellow-blue p-1.5 rounded-lg font-bold">
        Donate to index
      </button>
    </div>
  );
}

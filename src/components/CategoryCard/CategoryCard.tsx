import { PropType } from "./types";
import no_provery_img from "../../assets/images/unsdg-no-poverty.png";

export default function CategoryCard({ title, description }: PropType) {
  return (
    <div className="w-60 flex-none text-white p-1 pt-6">
      <img src={no_provery_img} className="w-36 h-16" />
      <h1 className="font-bold text-2xl uppercase">{title}</h1>
      <p className="text-base">{description}</p>
      <button className="uppercase bg-yellow-blue">Donate to index</button>
    </div>
  );
}

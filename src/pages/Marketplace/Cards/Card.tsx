import { Link } from "react-router-dom";
import { Endowment } from "types/aws";
import BookmarkBtn from "components/BookmarkBtn";
import { appRoutes } from "constants/routes";

export default function Card({
  name,
  image,
  id,
  endow_type,
  categories,
}: Endowment) {
  return (
    <div className="relative overflow-clip  dark:bg-blue-d6 rounded-md border border-gray-l2 dark:border-bluegray-d1 hover:border-blue dark:hover:border-blue">
      <p className="absolute top-3 left-3 bg-orange-l1 text-white font-semibold text-2xs rounded-sm uppercase px-2 py-0.5 font-heading">
        {endow_type === "Charity" ? "Non-profit" : "For-profit"}
      </p>
      <BookmarkBtn
        name={name!}
        id={id}
        classes="absolute top-3 right-3 text-red-l1"
      />
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="grid grid-rows-[1fr_auto]"
      >
        <img
          src={image}
          className="h-44 w-full object-cover bg-blue-l4 dark:bg-blue-d2"
          alt=""
          onError={(e) => {
            e.currentTarget.classList.add("bg-blue-l3");
          }}
        />
        <div className="p-3">
          <h3 className="font-bold dark:text-white">{name}</h3>
          <p className="text-gray-d1 dark:text-gray-l1 text-sm mt-0.5">
            Country, city
          </p>
        </div>
        <div className="flex text-2xs font-bold px-3 pb-3 gap-1">
          {categories.sdgs.map((s) => (
            <SDG num={s} key={s} />
          ))}
        </div>
      </Link>
    </div>
  );
}

function SDG({ num }: { num: number }) {
  return (
    <div className="bg-blue-l4 dark:bg-blue-d5 dark:text-white uppercase rounded-full px-2 py-0.5">
      SDG #{num}
    </div>
  );
}

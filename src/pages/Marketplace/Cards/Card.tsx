import { Link } from "react-router-dom";
import { EndowmentEntry } from "types/contracts";
import BookmarkBtn from "components/BookmarkBtn";
import { appRoutes } from "constants/routes";

export default function Card({ name, image, id }: EndowmentEntry) {
  return (
    <div className="relative dark:bg-blue-d6 rounded-md border border-gray-l2 dark:border-bluegray-d1 hover:border-blue dark:hover:border-blue">
      <BookmarkBtn
        name={name!}
        id={id}
        classes="absolute top-3 right-3 text-red-l1"
      />
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="grid grid-rows-[1fr_auto] overflow-clip "
      >
        <img
          src={image}
          className="h-44 object-cover bg-blue-l4 dark:bg-blue-d2"
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
          <SDG num={1} />
          <SDG num={2} />
          <SDG num={3} />
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

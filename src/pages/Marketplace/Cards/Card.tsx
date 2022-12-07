import { Link } from "react-router-dom";
import { Endowment } from "types/aws";
import Icon from "components/Icon";
import { appRoutes } from "constants/routes";
import BookmarkBtn from "./BookmarkBtn";

export default function Card({
  name,
  logo,
  image,
  id,
  endow_type,
  categories,
  country_of_origin,
  kyc_donors_only,
}: Endowment) {
  return (
    <div className="relative overflow-clip dark:bg-blue-d6 rounded-lg border border-gray-l2 dark:border-bluegray hover:border-blue dark:hover:border-blue">
      <div className="absolute top-3 left-3 right-3 flex justify-between">
        <p className="bg-orange-l1 text-white font-semibold text-2xs rounded-sm uppercase px-2 py-0.5 font-heading">
          {endow_type === "Charity" ? "Non-profit" : "For-profit"}
        </p>
        {!kyc_donors_only && (
          <Icon
            type="AdminPanel"
            size={20}
            className="ml-auto mr-3 text-white hover:text-orange cursor-pointer"
          />
        )}
        <BookmarkBtn name={name} id={id} logo={logo} />
      </div>
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="grid grid-rows-[1fr_auto]"
      >
        <img
          loading="lazy"
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
            {country_of_origin}
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
    <div className="bg-blue-l4 hover:bg-blue-l3 dark:bg-blue-d4 hover:dark:bg-blue-d3 dark:text-white uppercase rounded-full px-2 py-0.5">
      SDG #{num}
    </div>
  );
}

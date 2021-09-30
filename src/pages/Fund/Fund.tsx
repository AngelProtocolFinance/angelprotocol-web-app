import AppHead from "components/Headers/AppHead";
import FundVid from "./FundVid";
import fundLogo from "assets/images/unsdg-gender-equality.png";
import { charities } from "./charities";
import CharityCard from "components/CharityCard";

//props
//fundBgClass
//fundLogo
//heading
//description
export default function Fund() {
  return (
    <section className="grid content-start pb-24">
      <AppHead />
      <div className="grid container mx-auto items-center">
        <div className="col-start-1 col-span-1 bg-red-700 self-stretch grid grid-cols-a1 items-center rounded-xl shadow-md">
          <img src={fundLogo} alt="" className="h-44 m-9" />
          <h1 className="text-5xl text-white uppercase font-bold ">
            <div className="mb-2">UNSDG #5</div>
            <div>Gender Quality</div>
          </h1>
        </div>
        <FundVid />
        <article className="mt-6 col-start-1 col-span-1 row-start-2 row-span-1">
          <h3 className="text-2xl text-white mb-4 font-semibold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
            repellat nemo illo
          </h3>
          <p className="text-white-grey pr-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam vero
            similique sapiente voluptate repellat dolorum doloremque perferendis
            iusto? Amet ea, est repellendus ut quisquam maxime nam voluptatum et
            adipisci sapiente? Iusto harum et nostrum labore consequatur eius
            voluptate nemo quod fuga aspernatur. Nam fuga commodi error
            reprehenderit obcaecati, praesentium eius harum, mollitia soluta aut
            quibusdam esse itaque maxime, dignissimos tempore. Animi facere
            inventore dignissimos numquam tenetur exercitationem earum sit
            placeat, ducimus quidem aliquid maiores ipsa odit consectetur
            doloremque similique quis autem magnam vitae incidunt deserunt
            accusantium! Dolorem consectetur ducimus harum!
          </p>
        </article>
        <div className="col-start-2 col-span-1 row-start-2 row-span-1 ml-2 self-start mt-6">
          <button className="bg-yellow-blue uppercase text-white text-sm w-32 py-2 rounded-lg font-semibold shadow-md">
            Donate
          </button>
          <button className="ml-2 bg-angel-blue uppercase text-white text-sm w-32 py-2 rounded-lg font-semibold shadow-md">
            Share
          </button>
        </div>
      </div>
      <div className="mt-8 container mx-auto text-white-grey">
        <p className="uppercase text-2xl font-heading font-semibold mb-4">
          Charities in this index
        </p>
        <ul className="flex flex-wrap gap-4">
          {charities.map((data) => (
            <CharityCard key={data.id} {...data} />
          ))}
        </ul>
      </div>
    </section>
  );
}

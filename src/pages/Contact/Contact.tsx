import BlockLoader from "components/Loader/BlockLoader";
import LineLoader from "components/Loader/LineLoader";
import useHBSTCreator from "hooks/useHBSTCreator";

export default function Contact() {
  const { isLoading, error } = useHBSTCreator();

  let form = <BlockLoader size={20} thickness={4} color={"angel-blue"} />;

  //hbst form style needs to be set at 100% when transfer is done
  if (!isLoading) {
    form = <div id="hbst" className="container my-10 pl-5 max-w-5xl"></div>;
  }

  if (error) {
    form = (
      <div className="container grid place-items-center text-2xl text-center text-red-400 h-96">
        {error}
      </div>
    );
  }
  return (
    <div className="pt-24 grid justify-items-center">
      <section className="grid items-center bg-contact bg-no-repeat bg-cover bg-center w-full h-96">
        <h1 className="text-4xl text-white font-semibold text-center">
          We’d love to connect to better understand how we can support your
          cause!
        </h1>
      </section>
      {form}
    </div>
  );
}

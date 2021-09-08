import BlockLoader from "components/Loader/BlockLoader";
import useHBSTCreator from "hooks/useHBSTCreator";

export default function Contact() {
  const { isLoading, error } = useHBSTCreator();

  let form = (
    <div className="my-10 flex flex-col items-center">
      <p className="mb-3 text-blue-accent">contact form is loading</p>
      <BlockLoader size={20} thickness={4} color={"blue-accent"} />
    </div>
  );

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
      <section className="grid items-center bg-contact bg-no-repeat bg-cover bg-center w-full h-96 px-5">
        <h1 className="text-3xl lg:text-4xl text-white font-semibold text-center">
          We’d love to connect to better understand how we can support your
          cause!
        </h1>
      </section>
      {form}
    </div>
  );
}

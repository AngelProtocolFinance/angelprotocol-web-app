import Loader from "components/Loader/Loader";

export default function LoadPage() {
  return (
    <div
      className={`grid place-items-center bg-gradient-to-b from-blue-accent to-black-blue`}
    >
      <div className="">
        <p className="text-white uppercase text-xl mb-6 uppercase">
          app is loading
        </p>
        <Loader bgColorClass="bg-white" widthClass="w-4" gapClass="gap-4" />
      </div>
    </div>
  );
}

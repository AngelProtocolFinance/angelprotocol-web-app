import { IconContext } from "react-icons";
import { BsCheck2 } from "react-icons/bs";

export default function Title({ isSuccess }: { isSuccess: boolean }) {
  if (!isSuccess) {
    return <p className="text-3xl font-bold">Register your wallet</p>;
  }

  return (
    <div className="flex flex-col text-center items-center justify-center gap-4">
      <IconContext.Provider value={{ className: "text-7xl text-white" }}>
        <BsCheck2 />
      </IconContext.Provider>
      <p className="text-3xl font-bold uppercase">success!</p>
    </div>
  );
}

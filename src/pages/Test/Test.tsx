import useDonate from "./useDonate";

export default function Test() {
  const getTCA = useDonate();
  return (
    <div className="flex justify-center items-center px-5">
      <form>
        <input />
        <button type="button" className="text-white block" onClick={getTCA}>
          submit
        </button>
      </form>
    </div>
  );
}

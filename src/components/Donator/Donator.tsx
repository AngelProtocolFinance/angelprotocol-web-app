export default function Donator() {
  return (
    <form className="flex flex-col items-center bg-white rounded-sm shadow-md p-2 h-60">
      <p className="text-center my-5">Specify donation amount</p>
      <span>1000</span>
      <div className="border mb-5">
        <label
          htmlFor="amount"
          className="bg-blue-400 text-angel-grey text-lg p-2 rounded-sm ml-1"
        >
          UST :
        </label>
        <input
          autoComplete="off"
          id="amount"
          type="text"
          className="bg-transparent text-lg focus:outline-none text-angel-grey pl-2 p-2"
        />
      </div>

      <button className="bg-angel-orange py-1 px-">Donate</button>
    </form>
  );
}

import AddressSelector from "./AddressSelector";
// import { newIndexFundSchema } from "./newIndexSchema";
import { useForm } from "react-hook-form";

const NewIndexFundModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => console.log("submit", data);

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-115 p-5 text-center max-h-3/4 overflow-y-scroll">
      <span className="text-2xl font-semibold inline-block mb-1">
        New Index fund
      </span>
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-10 text-left relative">
          <label
            htmlFor="id"
            className="text-md text-gray-600 font-bold mb-2 inline-block"
          >
            ID
          </label>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            {/* disabled this field because I assume the ID will be auto-generateed or derived from somewhere */}
            <input
              type="text"
              className="text-sm sm:text-base text-gray-600 outline-none border-none w-full px-3 bg-gray-200"
              defaultValue="238"
              id="id"
              {...register("id", { required: true })}
            />
          </div>
          <label
            htmlFor="name"
            className="text-md text-gray-600 font-bold my-2 inline-block"
          >
            Name
          </label>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            <input
              type="text"
              className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
              placeholder="Index fund name"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
              Index fund name is required
            </p>
          )}
          <label
            htmlFor="description"
            className="text-md text-gray-600 font-bold my-2 inline-block"
          >
            description
          </label>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            <textarea
              className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
              placeholder=""
              {...register("description", { required: true })}
            />
          </div>
          {errors.description && (
            <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
              Description is required
            </p>
          )}
        </div>
        <AddressSelector></AddressSelector>
        <div className="w-full flex flex-cols-2 align-items-center justify-between gap-2">
          <div>
            <button
              type="submit"
              className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
            >
              Submit
            </button>
          </div>
          <div>
            <button className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewIndexFundModal;

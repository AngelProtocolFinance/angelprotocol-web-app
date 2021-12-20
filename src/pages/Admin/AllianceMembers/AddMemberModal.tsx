import { useForm } from "react-hook-form";
import { useModalCloser } from "components/Modal/Modal";

const NewMemberModal = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log("submit", data);
  const closeModal = useModalCloser();

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-115 p-5 text-center max-h-3/4 overflow-y-scroll">
      <span className="text-2xl font-semibold inline-block mb-1">
        New Alliance Member
      </span>
      <form className="text-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="my-10 text-left relative">
          <label
            htmlFor="wallet"
            className="text-md text-gray-600 font-bold mb-2 inline-block"
          >
            Wallet
          </label>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            <input
              type="text"
              className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
              placeholder="Wallet address"
              id="wallet"
              {...register("wallet", { required: true })}
            />
          </div>
          {errors.wallet && (
            <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
              Wallet is required
            </p>
          )}
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
              placeholder="Alliance member name"
              id="name"
              {...register("name", { required: true })}
            />
          </div>
          {errors.name && (
            <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
              Alliance member name is required
            </p>
          )}
          <label
            htmlFor="logo"
            className="text-md text-gray-600 font-bold my-2 inline-block"
          >
            Logo
          </label>
          <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
            <input
              type="file"
              accept="image/*"
              id="logo"
              {...register("logo", { required: true })}
            />
          </div>
          {errors.logo && (
            <p className="text-xs sm:text-sm text-failed-red mt-1 pl-1">
              Logo is required
            </p>
          )}
        </div>
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
            <button
              onClick={closeModal}
              className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewMemberModal;

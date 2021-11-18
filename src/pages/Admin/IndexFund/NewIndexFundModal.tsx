import { ErrorMessage, Field, Form, Formik } from "formik";
import AddressSelector from "./AddressSelector";
import { newIndexFundSchema } from "./newIndexSchema";

const NewIndexFundModal = () => {
  const handleLogin = () => {};

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-r15 p-5 text-center max-h-3/4 overflow-y-scroll">
      <span className="text-2xl font-semibold inline-block mb-1">
        New Index fund
      </span>
      <Formik
        initialValues={{ id: "Id", name: "", description: "description" }}
        validationSchema={newIndexFundSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting, status }) => (
          <Form className="text-center">
            <div className="my-10 text-left relative">
              {status}
              <label
                htmlFor="id"
                className="text-md text-gray-600 font-bold mb-2 inline-block"
              >
                ID
              </label>
              <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                {/* I disabled this field because I assume the ID will be auto-generateed or derived from somewhere */}
                <Field
                  type="text"
                  className="text-sm sm:text-base text-gray-600 outline-none border-none w-full px-3 bg-gray-200"
                  name="id"
                  value="238"
                  disabled
                />
              </div>
              <label
                htmlFor="name"
                className="text-md text-gray-600 font-bold my-2 inline-block"
              >
                Name
              </label>
              <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                <Field
                  type="text"
                  className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
                  placeholder="Index fund name"
                  name="name"
                />
              </div>
              <ErrorMessage
                className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                name="name"
                component="div"
              />
              <label
                htmlFor="description"
                className="text-md text-gray-600 font-bold my-2 inline-block"
              >
                description
              </label>
              <div className="form-control rounded-md bg-gray-200 p-2 flex justify-between items-center">
                <Field
                  component="textarea"
                  className="text-sm sm:text-base outline-none border-none w-full px-3 bg-gray-200"
                  placeholder=""
                  name="description"
                />
              </div>
              <ErrorMessage
                className="text-xs sm:text-sm text-failed-red mt-1 pl-1"
                name="description"
                component="div"
              />
            </div>
            <AddressSelector></AddressSelector>
            <div className="w-full flex flex-cols-2 align-items-center justify-between gap-2">
              <div>
                <button
                  type="submit"
                  className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
                  disabled={isSubmitting}
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NewIndexFundModal;

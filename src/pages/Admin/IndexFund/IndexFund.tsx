import AppHead from "components/Headers/AppHead";
import Modal from "components/Modal/Modal";
import { useGetToken } from "contexts/AuthProvider";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";
import SideNav from "../SideNav";
import IndexFundTable from "./Table";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { newIndexFundSchema } from "./newIndexSchema";
import AddressSelector from "./AddressSelector";

export default function IndexFund() {
  const [showIndexModal, setShowIndexModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const decodedToken = useGetToken();

  //user can't access TCA page when not logged in or his prev token expired
  if (!decodedToken) {
    return <Redirect to={`${site.app}/${app.login}`} />;
  }

  return (
    <div className="grid grid-rows-a1 place-items-start min-h-screen pt-2 pb-16">
      <AppHead />
      <div className="flex md:grid-cols-2 justify-start w-full md:mx-auto md:container bg-gray-400 min-h-3/4 gap-0 mt-10">
        <SideNav />
        <div className="flex-grow w-full min-h-3/4 p-10 text-center">
          <h2 className="text-2xl font-semibold capitalize text-center">
            Index Funds Management
          </h2>
          <button
            className="mt-8 cols-start-1 col-span-2 capitalize hover:text-gray-500 text-white bg-orange disabled:bg-thin-grey shadow-md rounded-md w-48 py-2 font-normal"
            onClick={() => setShowIndexModal(true)}
          >
            Add new fund
          </button>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
              <IndexFundTable
                onEditClick={() => setShowUpdateModal(true)}
              ></IndexFundTable>
            </div>
          </div>
        </div>
      </div>
      {showIndexModal && (
        <Modal onModalClose={() => setShowIndexModal(false)}>
          <NewIndexFundModal />
        </Modal>
      )}
      {showUpdateModal && (
        <Modal onModalClose={() => setShowUpdateModal(false)}>
          <UpdateMembersModal />
        </Modal>
      )}
    </div>
  );
}

const NewIndexFundModal = () => {
  const handleLogin = () => {};

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-r15 p-5 text-center">
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

const UpdateMembersModal = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const handleUpdate = () => {};

  return (
    <div className="container mx-auto w-full sm:w-3/4 max-w-600 bg-white rounded-lg min-h-r15 p-5 text-center">
      <span className="text-2xl font-semibold inline-block mb-1">
        Update Members
      </span>

      <AddressSelector></AddressSelector>
      <div className="w-full flex flex-cols-2 align-items-center justify-between gap-2">
        <div>
          <button
            type="submit"
            className="disabled:bg-grey-accent bg-orange hover:bg-angel-orange text-center w-48 h-12 rounded-2xl tracking-widest uppercase text-md font-bold text-white shadow-sm"
            disabled={isSubmitting}
            onClick={handleUpdate}
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
    </div>
  );
};

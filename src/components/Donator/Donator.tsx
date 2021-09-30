import Announcer from "./Announcer";
import { Formik } from "formik";
import { donatorSchema } from "./donatorSchema";
import useDonate from "./useDonate";
import { createContext, ReactNode, useContext, useState } from "react";
import { Status, SetStatus, Steps } from "./types";

interface Props {
  children: ReactNode;
}

const initialStatus = {
  step: Steps.initial,
};

const getContext = createContext<Status>(initialStatus);
const setContext = createContext<SetStatus>(() => initialStatus);
//use these hooks only in components inside Donator
export const useGetStatus = () => useContext(getContext);
export const useSetStatus = () => useContext(setContext);

export default function Donator(props: Props) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const { handleDonate } = useDonate(status, setStatus);
  return (
    <getContext.Provider value={status}>
      <setContext.Provider value={setStatus}>
        <Formik
          initialValues={{ amount: "", split: 50 }}
          onSubmit={handleDonate}
          validationSchema={donatorSchema}
        >
          <>
            <Announcer />
            {props.children}
          </>
        </Formik>
      </setContext.Provider>
    </getContext.Provider>
  );
}

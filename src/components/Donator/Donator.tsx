import Announcer from "./Announcer";
import { Formik } from "formik";
import { donatorSchema } from "./donatorSchema";
import useDonate from "./useDonate";
import { createContext, useContext, useState } from "react";
import { Status, SetStatus, Steps, Props, Values } from "./types";

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
  const handleDonate = useDonate(status, setStatus, props.receiver);
  const maxLiq = props.maxSplitLiq;
  const minLocked = 100 - (maxLiq === undefined ? 50 : maxLiq); //0 || 50 = 50 x_x
  return (
    <getContext.Provider value={status}>
      <setContext.Provider value={setStatus}>
        <Formik<Values>
          initialValues={{
            amount: "",
            split: minLocked,
            receiptRequested: false,
          }}
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

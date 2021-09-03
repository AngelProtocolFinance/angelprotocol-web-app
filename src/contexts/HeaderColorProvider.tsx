import { createContext, ReactNode, useContext } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "types/types";

interface propType {
  children: ReactNode;
}

interface Colors {
  bgColor: String;
  textColor: String;
}

//default color
let colors = {
  bgColor: "bg-blue-400",
  textColor: "text-white",
};

const colorContext = createContext<Colors>(colors);

export default function HeaderColorProvider(props: propType) {
  const location = useLocation();
  switch (location.pathname) {
    case routes.home: {
      colors = {
        bgColor: "bg-white",
        textColor: "text-angel-grey",
      };
      break;
    }
    default: {
      colors = {
        bgColor: "bg-blue-400",
        textColor: "text-white",
      };
    }
  }

  return (
    <colorContext.Provider value={colors}>
      {props.children}
    </colorContext.Provider>
  );
}

export function useHeaderColors() {
  if (!colorContext) {
    throw new Error(
      "this hook should only be used for components inside HeaderColorProvider"
    );
  }
  return useContext(colorContext);
}

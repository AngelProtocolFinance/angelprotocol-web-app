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

const defaultColor = {
  bgColor: "bg-blue-accent",
  textColor: "text-white",
};

const colorContext = createContext<Colors>(defaultColor);

export default function HeaderColorProvider(props: propType) {
  const location = useLocation();
  const colors = (() => {
    switch (location.pathname) {
      case routes.contact:
      case routes.home: {
        return {
          bgColor: "bg-white",
          textColor: "text-angel-grey",
        };
      }
      default: {
        return defaultColor;
      }
    }
  })();

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

import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routes } from "types/types";

interface propType {
  children: ReactNode;
}

interface Colors {
  bgColor: string;
  textColor: string;
}

const defaultColor = {
  bgColor: "blue-accent",
  textColor: "white",
};

const colorContext = createContext<Colors>(defaultColor);

export default function HeaderColorProvider(props: propType) {
  const location = useLocation();

  //scroll to top when locatin changes - will add to a better context
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const colors = (() => {
    switch (location.pathname) {
      case routes.donors:
      case routes.charities:
      case routes.contact:
      case routes.home: {
        return {
          bgColor: "white",
          textColor: "angel-blue",
        };
      }
      case routes.tca: {
        return {
          bgColor: "transparent",
          textColor: "white",
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

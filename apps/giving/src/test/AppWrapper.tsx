import { store } from "@giving/store";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

export default function AppWrapper(props: PropsWithChildren) {
  return (
    <MemoryRouter>
      <Provider store={store}>{props.children}</Provider>
    </MemoryRouter>
  );
}

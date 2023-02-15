import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "store/store";

export default function AppWrapper(props: PropsWithChildren<object>) {
  return (
    <MemoryRouter>
      <Provider store={store}>{props.children}</Provider>
    </MemoryRouter>
  );
}

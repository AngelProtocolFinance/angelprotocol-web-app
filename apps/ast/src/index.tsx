import { initTheme } from "@ap/helpers";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "styles/index.css";

//set theme immediately, so even suspense loaders and can use it
initTheme();

const container = document.getElementById("root");
const root = createRoot(container as Element);

root.render(
  <StrictMode>
    <div>Hello world</div>
  </StrictMode>
);

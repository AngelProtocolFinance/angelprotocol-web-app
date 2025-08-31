export { loader } from "./loader";
import { Outlet } from "react-router";

export default function FormBuilderLayout() {
  return (
    <div className="px-6 py-8 md:p-10 @container">
      <Outlet />
    </div>
  );
}

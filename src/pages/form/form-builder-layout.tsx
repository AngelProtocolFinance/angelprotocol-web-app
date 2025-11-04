export { loader } from "./api";
import { Outlet } from "react-router";

export default function FormBuilderLayout() {
  return (
    <div className="@container">
      <Outlet />
    </div>
  );
}

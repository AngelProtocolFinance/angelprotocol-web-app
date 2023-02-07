import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "components/Loader";
import WidgetConfigurer from "./WidgetConfigurer";
import { routes } from "./routes";

export default function Views() {
  return (
    <Suspense fallback={<LoaderComponent />}>
      <Routes>
        <Route path={routes.widget} element={<WidgetConfigurer />} />
        <Route index element={<div />} />
        <Route path="*" element={<Navigate replace to={routes.index} />} />
      </Routes>
    </Suspense>
  );
}

const LoaderComponent = () => (
  <Loader bgColorClass="bg-white" gapClass="gap-2" widthClass="w-4" />
);

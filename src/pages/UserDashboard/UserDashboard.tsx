import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import DashboardLayout from "layout/DashboardLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import { linkGroups, routes } from "./routes";

export default withAuth(function UserDashboard({ user }) {
  return (
    <Routes>
      <Route
        element={
          <DashboardLayout
            rootRoute={`${appRoutes.user_dashboard}/`}
            linkGroups={linkGroups}
          />
        }
      >
        <Route path={routes.edit_profile} element={<div>edit profile</div>}/>
        <Route path="*" element={<Navigate replace to={routes.edit_profile} />} />
      </Route>
    </Routes>
  );
});

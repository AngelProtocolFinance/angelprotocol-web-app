import { appRoutes } from "constants/routes";
import withAuth from "contexts/Auth";
import DashboardLayout from "layout/DashboardLayout";
import { Navigate, Route, Routes } from "react-router-dom";
import Donations from "./Donations";
import EditProfile from "./EditProfile";
import { linkGroups, routes } from "./routes";

export default withAuth(function UserDashboard({ user }) {
  return (
    <Routes>
      <Route
        element={
          <DashboardLayout
            rootRoute={`${appRoutes.user_dashboard}/`}
            linkGroups={linkGroups}
            //dummy header
            sidebarHeader={<div className="h-5" />}
          />
        }
      >
        <Route path={routes.edit_profile} element={<EditProfile {...user} />} />
        <Route path={routes.donations} element={<Donations user={user} />} />
        <Route path="*" element={<Navigate replace to={routes.donations} />} />
      </Route>
    </Routes>
  );
});

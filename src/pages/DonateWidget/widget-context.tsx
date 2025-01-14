import { Outlet } from "@remix-run/react";
//outlet-value: isInWidget/widgetVersion
const WidgetContext = () => <Outlet context={true} />;
export default WidgetContext;

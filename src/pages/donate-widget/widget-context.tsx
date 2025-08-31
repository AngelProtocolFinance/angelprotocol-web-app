import { Outlet } from "react-router";
//outlet-value: isInWidget/widgetVersion
const WidgetContext = () => <Outlet context={true} />;
export default WidgetContext;



import { Outlet, useLocation } from "react-router-dom";
import BackButton from "./BackButton";

/**
 * Nested Layout for the Root Page,
 * Everything you'll add here will be shown inside the / link and anything nested inside of it,
 * if you plan to add About, praisings, and other cringe stuff, add it here. 
 * @returns 
 */
function Layout() {
  const location = useLocation();
  return (
    <div className="App">
      {(location.pathname !== '/') && <BackButton />}
      <Outlet />
    </div>
  );
}
export default Layout;

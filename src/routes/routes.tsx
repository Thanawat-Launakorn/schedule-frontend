import DefaultLayout from "../view/layout/defaultLayout";
import {
  auth,
  dashboard,
  defaultLayout,
  routerDefault,
  user,
} from "./default.router";

// export
export const routes = [...routerDefault, defaultLayout];
export default routes;

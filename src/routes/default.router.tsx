import type { RouteObject } from "react-router-dom";
import CreateRole from "../view/listuser/createRole";
import AppCalendar from "../view/calendar";
import Dashboard from "../view/dashboard";
import Error404 from "../view/error/error404";
import Error500 from "../view/error/error500";
import DefaultLayout from "../view/layout/defaultLayout";
import ListUser from "../view/listuser";
import CreateUser from "../view/listuser/create";
import EditUser from "../view/listuser/edit";
import Signin from "../view/login";
import NonLayout from "../view/nolayout";
import Setting from "../view/setting";
import Signout from "../view/signout";

export const dashboard = [
  { path: "/dashboard", element: <Dashboard />, key: 1 },
];
export const user = [
  { path: "/user-management", element: <ListUser />, key: 2 },
  { path: "/user-management/create/user", element: <CreateUser /> },
  { path: "/user-management/create/role", element: <CreateRole /> },
  { path: "/user-management/edit", element: <EditUser /> },
];

export const calendar = [
  { path: "/calendar", element: <AppCalendar />, key: 3 },
];
export const setting = [{ path: "/setting", element: <Setting />, key: 4 }];
export const auth = [{ path: "/signout", element: <Signout /> }];

export const routerDefault: Array<RouteObject> = [
  {
    path: "/error",
    element: <NonLayout />,
    children: [
      { path: "/error/404", element: <Error404 /> },
      { path: "/error/500", element: <Error500 /> },
    ],
  },
  { path: "/login", element: <Signin /> },
  { path: "/", element: <DefaultLayout /> },
  { path: "*", element: <Error404 /> },
];

export const defaultLayout = {
  path: "/",
  element: <DefaultLayout />,
  children: [...dashboard, ...user, ...calendar, ...setting],
};

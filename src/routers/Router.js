import {createBrowserRouter} from "react-router-dom";
import Landing from "../pages/Landing";
import Domestic from "../pages/domestic";
import DomesticIndex from "../pages/domestic/indexd";
import DomesticStock from "../pages/domestic/stock";

import Login from "../pages/user/login";
import Register from "../pages/user/register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
    children: [
      {
        path: "domestic",
        element: <Domestic/>,
        children: [
          {
            path: "index",
            element: <DomesticIndex/>
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  }
])

import React from "react";
import "./App.css";
import {
  redirect,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Login from "./login";
import Home from "./home";
import CreteUser from "./createuser";
import Linkhome from "./link_home";
import LinkEdit from "./link_edit";
import About from "./about";
import { FourOhFour } from "./404";
import axios from "axios";
import { ValidateResponse } from "./types";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  { path: "/about", element: <About /> },
  { path: "/login", element: <Login /> },
  { path: "/p", element: <FourOhFour /> },
  { path: "/create", element: <CreteUser /> },
  {
    path: "/p/:id",
    element: <Linkhome />,
    loader: async ({ params }) => {
      //console.log("GAMING");
      const res = await axios.get(
        `https://linkbush-api.azurewebsites.net/page/${params.id}`,
        { validateStatus: (status) => status < 504 }
      );
      if (res.status >= 400) {
        throw redirect("/p");
      }
      return res;
    },
  },
  {
    path: "/edit",
    element: <LinkEdit />,
    loader: async ({}) => {
      const response = await axios.get(
        `https://linkbush-api.azurewebsites.net/page/nov13`,
        { validateStatus: (status) => status < 504 }
      );
      if (response.status >= 400) {
        throw redirect("/p");
      }
      return response;
    },
  },
]);

const App = () => <RouterProvider router={router} />;
export default App;

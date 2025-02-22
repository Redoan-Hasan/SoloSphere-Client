import { Route, Routes } from "react-router";
import Root from "../layouts/Root";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";


export const routes = (
  <Routes>
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Route>
  </Routes>
);

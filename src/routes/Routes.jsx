import { Route, Routes } from "react-router";
import Root from "../layouts/Root";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import ErrorPage from "../pages/ErrorPage";
import MyPostedJobs from "../pages/MyPostedJobs";
import UpdateJob from "../pages/UpdateJob";


export const routes = (
  <Routes>
    <Route path="/" element={<Root />} errorElement={<ErrorPage />} >
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="/job/:id" element={<JobDetails />} />
      <Route path="/add-job" element={<AddJob />} />
      <Route path="/postedJobs" element={<MyPostedJobs />} />
      <Route path="/updateJob/:id" element={<UpdateJob />} />
    </Route>
  </Routes>
);

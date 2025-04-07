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
import PrivateRoute from "./PrivateRoute";
import MyBids from "../pages/MyBids";
import BidRequests from "../pages/BidRequests";
import AllJobs from "../pages/AllJobs";

export const routes = (
  <Routes>
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route
        path="/job/:id"
        element={
          <PrivateRoute>
            <JobDetails />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-job"
        element={
          <PrivateRoute>
            <AddJob />
          </PrivateRoute>
        }
      />
      <Route
        path="/postedJobs"
        element={
          <PrivateRoute>
            <MyPostedJobs />
          </PrivateRoute>
        }
      />
      <Route
        path="/updateJob/:id"
        element={
          <PrivateRoute>
            <UpdateJob />
          </PrivateRoute>
        }
      />
      <Route
        path="/myBids"
        element={
          <PrivateRoute>
            <MyBids />
          </PrivateRoute>
        }
      />
      <Route
        path="/bidRequests"
        element={
          <PrivateRoute>
            <BidRequests />
          </PrivateRoute>
        }
      />
      <Route
        path="/allJobs"
        element={
            <AllJobs />
        }
      />
    </Route>
  </Routes>
);

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
const TabCategories = () => {
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const getData = async () => {
      await fetch(`${import.meta.env.VITE_API_URL}/jobs`)
      .then((res) => res.json())
      .then((data) => setJobs(data));
    };
    getData();
  }, []);
  return (
    <div className="my-10">
      <Tabs>
        <div className="py-8 text-center">
            <h1 className="text-4xl font-bold font-lato`">Browse Jobs By Categories</h1>
            <p className="text-lg font-medium md:w-[70%] lg:w-[70%] py-5 mx-auto">Three categories available for the time being. They are Web Development, Graphics Design and Digital Marketing, Browse them by clicking on the tabs bellow </p>
        </div>
        <div className="text-center  text-lg font-medium">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.filter((job) => job.category === "Web Development")
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.filter((job) => job.category === "Graphics Design")
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabPanel>
        <TabPanel>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.filter((job) => job.category === "Digital Marketing")
            .map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabCategories;

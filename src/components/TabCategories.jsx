import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
const TabCategories = () => {
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
          <h2><JobCard /></h2>
        </TabPanel>
        <TabPanel>
          <h2>Graphics Design</h2>
        </TabPanel>
        <TabPanel>
          <h2>Digital Marketing</h2>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TabCategories;

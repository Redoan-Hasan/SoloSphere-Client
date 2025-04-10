import axios from "axios";
import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";

const AllJobs = () => {
  const [itemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [jobs, setJobs] = useState([]);
  console.log(search);
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/allJobs?page=${currentPage}&size=${itemsPerPage}&filter=${filter}&sort=${sort}&search=${search}`
      );
      setJobs(data.data);
    };
    getData();
  }, [currentPage, itemsPerPage, filter, sort, search]);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/allJobsCount?filter=${filter}&search=${search}`
      );
      setCount(data.count);
    };
    getCount();
  }, [filter, search]);
  // console.log(filter);
  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);
  // console.log(currentPage);

  const handlePaginationBtn = (value) => {
    console.log(value);
    setCurrentPage(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(searchText);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setFilter("");
    setSearch("");
    setSort("");
    setSearchText("");
  };
  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row ">
          <div>
            <select
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              name="category"
              id="category"
              value={filter}
              className="p-4 border rounded-lg"
            >
              <option value="">Filter By Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                onChange={(e)=>setSearchText(e.target.value)}
                value={searchText}
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />

              <button className="px-1 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md md:px-4 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              onChange={(e) => {
                setSort(e.target.value);
              }}
              name="sort"
              id="category"
              className="p-4 border rounded-md"
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button onClick={ handleReset} className="btn">
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePaginationBtn(currentPage - 1)}
          className="px-4 py-2 mx-1 text-gray-700 capitalize bg-gray-200 rounded-md disabled:text-gray-500 disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500 hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            onClick={() => handlePaginationBtn(btnNum)}
            key={btnNum}
            className={` ${
              currentPage === btnNum && "bg-blue-500 text-white"
            } hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          disabled={currentPage === numberOfPages}
          onClick={() => handlePaginationBtn(currentPage + 1)}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllJobs;

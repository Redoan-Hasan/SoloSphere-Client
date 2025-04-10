import axios from "axios";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

const JobDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [data, setData] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      const data = await axios.get(`${import.meta.env.VITE_API_URL}/job/${id}`,{withCredentials:true});
      setData(data.data);
    };
    getData();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user?.email === data?.buyer?.email)
      return toast.error("You can't bid on your own job");
    const jobId = id;
    const price = parseFloat(e.target.price.value);
    if (price < data?.minimum_price || price > data?.maximum_price)
      return toast.error("Price must be within the range");
    const comment = e.target.comment.value;
    const job_title = data?.job_title;
    const category = data?.category;
    const email = user?.email;
    const deadline = startDate;
    const buyer_email = data?.buyer?.email;
    const status = "Pending";
    console.log({ price, comment, email, deadline, buyer_email, status });
    const bidDetails = { jobId, price, job_title, category,comment, email, deadline, buyer_email , status};

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/bid`,
        bidDetails
      );
      console.log(data);
      toast.success("Bid Placed Successfully");
      navigate("/");
    } catch (err) {
      console.log(err);
      return toast.error(err.response.data) && navigate("/");
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-around gap-5  items-center min-h-[calc(100vh-306px)] md:max-w-screen-xl mx-auto ">
      {/* Job Details */}
      <div className="flex-1  px-4 py-7 bg-white rounded-md shadow-md md:min-h-[350px]">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 ">
            {new Date(data?.deadline).toDateString()}
          </span>
          <span className="px-4 py-1 text-xs text-blue-800 uppercase bg-blue-200 rounded-full ">
            {data?.category}
          </span>
        </div>

        <div>
          <h1 className="mt-2 text-3xl font-semibold text-gray-800 ">
            {data?.job_title}
          </h1>

          <p className="mt-2 text-lg text-gray-600 ">{data?.description}</p>
          <p className="mt-6 text-sm font-bold text-gray-600 ">
            Buyer Details:
          </p>
          <div className="flex items-center gap-5">
            <div>
              <p className="mt-2 text-sm text-gray-600 ">
                Name: {data?.buyer?.email.split("@")[0]}
              </p>
              <p className="mt-2 text-sm text-gray-600 ">
                Email: {data?.buyer?.email}
              </p>
            </div>
            <div className="object-cover overflow-hidden rounded-full w-14 h-14">
              <img src={data?.buyer?.photo} alt="" />
            </div>
          </div>
          <p className="mt-6 text-lg font-bold text-gray-600 ">
            Range: {data?.minimum_price}$ - {data?.maximum_price}$
          </p>
        </div>
      </div>
      {/* Place A Bid Form */}
      <section className="p-6 w-full  bg-white rounded-md shadow-md flex-1 md:min-h-[350px]">
        <h2 className="text-lg font-semibold text-gray-700 capitalize ">
          Place A Bid
        </h2>

        <form onSubmit={handleFormSubmit}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label className="text-gray-700 " htmlFor="price">
                Price
              </label>
              <input
                id="price"
                type="text"
                name="price"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="emailAddress">
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                name="email"
                defaultValue={user?.email}
                disabled
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>

            <div>
              <label className="text-gray-700 " htmlFor="comment">
                Comment
              </label>
              <input
                id="comment"
                name="comment"
                type="text"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-gray-700">Deadline</label>
              <DatePicker
                className="p-2 border rounded-md"
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Place Bid
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default JobDetails;

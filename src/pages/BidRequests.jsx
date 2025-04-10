import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const BidRequests = () => {
  const {user} = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  
  const getData = async()=>{
    const data = await axios.get(`${import.meta.env.VITE_API_URL}/bidRequests/${user?.email}`);
    setRequests(data.data);
    // console.log(data.data);
  }

  const  handleStatus = async (id, prevStatus, status)=>{
    if(prevStatus === status) return toast.error("Status already updated");
    console.log(id,prevStatus, status);
    const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/bidStatus/${id}`,{status});
    console.log(data);
  }
  return (
    <section className="container px-4 pt-12 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Bid Requests</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {requests?.length} Requests
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Category
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
                  {requests?.map((request) => (
                    <tr key={request?._id}>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {request?.job_title}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {request?.email}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {new Date(request?.deadline).toDateString()}
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {request?.price}
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-2">
                        <p className="px-3 py-1 text-xs text-blue-500 rounded-full bg-blue-100/60">
                          {request?.category}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                    <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            request?.status === 'Pending' &&
                            'bg-yellow-100/60 text-yellow-500'
                          } ${
                            request?.status === 'In Progress' &&
                            'bg-blue-100/60 text-blue-500'
                          } ${
                            request?.status === 'Complete' &&
                            'bg-emerald-100/60 text-emerald-500'
                          } ${
                            request?.status === 'Rejected' &&
                            'bg-red-100/60 text-red-500'
                          } `}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              request?.status === 'Pending' && 'bg-yellow-500'
                            } ${
                              request?.status === 'In Progress' && 'bg-blue-500'
                            } ${request?.status === 'Complete' && 'bg-green-500'} ${
                              request?.status === 'Rejected' && 'bg-red-500'
                            }  `}
                          ></span>
                          <h2 className='text-sm font-normal '>{request?.status}</h2>
                        </div>
                    </td>
                    <td className="px-4 py-4 text-sm whitespace-nowrap">
                      <div className="flex items-center gap-x-6">
                        <button onClick={()=>handleStatus(request?._id, request?.status, "In Progress")}
                        disabled={request?.status === "In Progress" || request.status === 'Complete'}
                        className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </button>

                        <button onClick={()=>handleStatus(request?._id, request?.status, "Rejected")} 
                        disabled={request.status === 'Rejected' || request.status === 'Complete'}
                        className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-5 h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BidRequests;

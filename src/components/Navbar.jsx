import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";

    const Navbar = () => {
        const {user,logOut}=useContext(AuthContext);
    return (
        <div className="container px-4 mx-auto bg-gray-300 border rounded-lg navbar">
        <div className="flex-1">
            <div className="flex items-center gap-2">
            <img className="w-auto h-7" src={'https://github.com/shakilahmedatik/soloSphere-resources/blob/main/images/logo.png?raw=true'} alt="" />
            <span className="text-xl font-bold">SoloSphere</span>
            </div>
        </div>
        <div className="flex-none ">
            <ul className="px-1 menu menu-horizontal">
            <li>
                <Link to="/" className="text-xl font-semibold">Home</Link>
            </li>

            {
                !user && 
                <li>
                    <Link to="/login" className="text-xl font-semibold">Login</Link>
                </li>
            }
            </ul>

            {
                user &&
                <div className="z-50 dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
            >
                <div className="w-24 rounded-full" title={user?.displayName}>
                <img
                    className=""
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                <Link to="/add-job" className="justify-between text-xl font-semibold">Add Job</Link>
                </li>
                <li>
                <Link to="/postedJobs" className="text-xl font-semibold">My Posted Jobs</Link>
                </li>
                <li>
                <div className="text-xl font-semibold">My Bids</div>
                </li>
                <li>
                <div className="text-xl font-semibold">Bid Requests</div>
                </li>
                <li className="mt-2">
                <button onClick={logOut} className="block text-xl font-semibold text-center bg-gray-200">Logout</button>
                </li>
            </ul>
            </div>
            }
        </div>
        </div>
    );
    };

    export default Navbar;

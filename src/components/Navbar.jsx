import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link } from "react-router";

    const Navbar = () => {
        const {user,logOut}=useContext(AuthContext);
    return (
        <div className="navbar bg-gray-300 rounded-lg border  container px-4 mx-auto">
        <div className="flex-1">
            <div className="flex gap-2 items-center">
            <img className="w-auto h-7" src={'https://github.com/shakilahmedatik/soloSphere-resources/blob/main/images/logo.png?raw=true'} alt="" />
            <span className="font-bold text-xl">SoloSphere</span>
            </div>
        </div>
        <div className="flex-none ">
            <ul className="menu menu-horizontal px-1">
            <li>
                <div className="text-xl font-semibold">Home</div>
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
                <div className="dropdown dropdown-end z-50">
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
                <div className="justify-between  text-xl font-semibold">Add Job</div>
                </li>
                <li>
                <div className="text-xl font-semibold">My Posted Jobs</div>
                </li>
                <li>
                <div className="text-xl font-semibold">My Bids</div>
                </li>
                <li>
                <div className="text-xl font-semibold">Bid Requests</div>
                </li>
                <li className="mt-2">
                <button onClick={logOut} className="bg-gray-200 block text-center text-xl font-semibold">Logout</button>
                </li>
            </ul>
            </div>
            }
        </div>
        </div>
    );
    };

    export default Navbar;

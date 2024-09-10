import { Link, NavLink } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../Redux/Features/User/userSlice";
export default function Header() {
  const dispatch = useDispatch();
  const location = useLocation();
  axios.defaults.withCredentials = true;
  const [isloggedin, setIsloggedin] = useState();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get("http://localhost:8000/api/test").then((res) => {
      console.log(res.data);
      setIsloggedin(res.data.success);
    });
  }, [location]);

  const HandleLogout = () => {
    axios.get("http://localhost:8000/api/logout").then((res) => {
      const data = {
        status: "error",
        message: "You are not logged in",
      };
      dispatch(addUser(data));
      toast.success(res.data.message, { theme: "dark" });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    });
  };

  return (
    <>
      <ToastContainer />
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-gray-900 border-gray-700 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <img
                src="https://creativators.nl/wp-content/uploads/2023/12/CODEGO.png"
                className="mr-1 h-20"
                alt="Logo"
              />
            </Link>
            <div className="flex items-center lg:order-2">
              {!isloggedin && (
                <>
                  <Link
                    to="/signin"
                    className="text-gray-300 hover:bg-gray-800 focus:ring-4 focus:ring-gray-600 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  >
                    Register
                  </Link>
                </>
              )}
              {isloggedin && (
                <Link
                  className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-500 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
                  onClick={HandleLogout}
                >
                  Logout
                </Link>
              )}
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-orange-500" : "text-gray-300"
                      } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-orange-500" : "text-gray-300"
                      } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-orange-500" : "text-gray-300"
                      } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/github"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-orange-500" : "text-gray-300"
                      } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                    }
                  >
                    Github
                  </NavLink>
                </li>
                {user.status === "success" && (
                  <li>
                    <NavLink
                      to={`/SubmitHistoryPage/${user.id}`}
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-500" : "text-gray-300"
                        } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                      }
                    >
                      View Submit History
                    </NavLink>
                  </li>
                )}
                {user.role === "admin" && (
                  <li>
                    <NavLink
                      to="/Adminpage"
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-500" : "text-gray-300"
                        } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                      }
                    >
                      Admin Dashboard
                    </NavLink>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

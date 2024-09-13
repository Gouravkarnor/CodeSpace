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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the mobile menu
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/test`).then((res) => {
      console.log(res.data);
      setIsloggedin(res.data.success);
    });
  }, [location]);

  const HandleLogout = () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/logout`).then((res) => {
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
                src="data:image/png;base64,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"
                className="mr-1 h-20"
                alt="Logo"
              />
            </Link>

            {/* Hamburger menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-gray-400 hover:text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>

            <div
              className={`justify-between items-center w-full lg:flex lg:w-auto lg:order-1 ${
                isMenuOpen ? "block" : "hidden"
              }`}
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
                    to="/About"
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
                    to="/Contact"
                    className={({ isActive }) =>
                      `block py-2 pr-4 pl-3 duration-200 ${
                        isActive ? "text-orange-500" : "text-gray-300"
                      } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                    }
                  >
                    Contact
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
                {isloggedin ? (
                  <li
                      onClick={HandleLogout}
                      className={({ isActive }) =>
                        `block py-2 pr-4 pl-3 duration-200 ${
                          isActive ? "text-orange-500" : "text-gray-300"
                        } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                      }
                    >
                      Logout
                  </li>
                ) : (
                  <>
                    <li>
                      <NavLink
                        to="/signin"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 duration-200 ${
                            isActive ? "text-orange-500" : "text-gray-300"
                          } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                        }
                      >
                        Login
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/signup"
                        className={({ isActive }) =>
                          `block py-2 pr-4 pl-3 duration-200 ${
                            isActive ? "text-orange-500" : "text-gray-300"
                          } border-b border-gray-800 hover:bg-gray-800 lg:hover:bg-transparent lg:border-0 hover:text-orange-500 lg:p-0`
                        }
                      >
                        Register
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

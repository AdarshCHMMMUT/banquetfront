import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Booking from "./pages/Banquet/Booking";
import ListCategory from "./pages/Category/ListCategory";
import Limits from "./pages/Category/limit";
import logo from "./assets/pcs.png";
import ShowBooking from "./pages/Banquet/showbooking";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("dashboard");
  const [ml, setML] = useState(false);
  const currentUser = localStorage.getItem("currentUser");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  // Navigation items array
  const navItems = [
    {
      name: "Dashboard",
      path: "/",
      active: "dashboard",
      icon: (
        <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
            className="dark:fill-slate-600 fill-current text-[#ff4242]"
          ></path>
          <path
            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
            className="fill-current text-[#ff4242] group-hover:text-[#ed5656]"
          ></path>
          {/* <path
            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
            className="fill-current group-hover:text-[#ed5656]"
          ></path> */}
        </svg>
      ),
    },
    {
      name: "Booking",
      path: "/booking",
      active: "booking",
      icon: (
        <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
            className="dark:fill-slate-600 fill-current text-[#ff4242]"
          ></path>
          <path
            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
            className="fill-current text-[#ff4242] group-hover:text-[#ed5656]"
          ></path>
          <path
            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
            className="fill-current group-hover:text-[#ed5656]"
          ></path>
        </svg>
      ),
    },
    {
      name: "Show Booking",
      path: "/showbooking",
      active: "showbooking",
      icon: (
        <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
            className="dark:fill-slate-600 fill-current text-[#ff4242]"
          ></path>
          <path
            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
            className="fill-current text-[#ff4242] group-hover:text-[#ed5656]"
          ></path>
          <path
            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
            className="fill-current group-hover:text-[#ed5656]"
          ></path>
        </svg>
      ),
    },
    {
      name: "Menu Management",
      path: "/listcategory",
      active: "listcategory",
      icon: (
        <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 Viewed
24" fill="none">
          <path
            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
            className="dark:fill-slate-600 fill-current text-[#ff4242]"
          ></path>
          <path
            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
            className="fill-current text-[#ff4242] group-hover:text-[#ed5656]"
          ></path>
          <path
            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
            className="fill-current group-hover:text-[#ed5656]"
          ></path>
        </svg>
      ),
    },
    {
      name: "Rate Plan Setting",
      path: "/limits",
      active: "limits",
      icon: (
        <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
            className="dark:fill-slate-600 fill-current text-[#ff4242]"
          ></path>
          <path
            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
            className="fill-current text-[#ff4242] group-hover:text-[#ed5656]"
          ></path>
          <path
            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1A2 2 0 0 1-2-2v-1Z"
            className="fill-current group-hover:text-[#ed5656]"
          ></path>
        </svg>
      ),
    },
  ];

  // Redirect to login if no currentUser
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Update activeLink based on route
  useEffect(() => {
    const path = location.pathname;
    const activeItem = navItems.find(item => item.path === path);
    setActiveLink(activeItem ? activeItem.active : "dashboard");
  }, [location.pathname]);

  // Toggle sidebar for mobile devices
  const setMl = () => {
    if (window.innerWidth < 768) {
      setML(prev => !prev);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {currentUser ? (
        <section className="bg-gray-100 dark:bg-gray-900">
          <aside
            className={
              ml
                ? "fixed top-0 z-10 ml-0 flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] dark:bg-gray-800 dark:border-gray-700"
                : "fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] dark:bg-gray-800 dark:border-gray-700"
            }
          >
            <div className="overflow-y-auto z-60 h-[90vh] overflow-x-hidden">
              <div className="-mx-6 z-60 px-6 py-4">
                {window.innerWidth < 768 && (
                  <div className="flex items-center justify-between">
                    <h5
                      onClick={setMl}
                      className="z-60 flex justify-end text-2xl font-medium text-gray-600 lg:block dark:text-white"
                    >
                      <AiFillCloseCircle />
                    </h5>
                    <button
                      onClick={handleLogout}
                      className="group flex items-center space-x-4 rounded-md px-4 py-3 text-black"
                      aria-label="logout"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span className="group-hover:text-gray-700 dark:group-hover:text-white">
                        Logout
                      </span>
                    </button>
                  </div>
                )}
                <h2 className="font-semibold text-xl mt-3">
                  Crew Schedule <span>©</span>
                </h2>
              </div>

              <div className="mt-8 text-center">
                <img
                  src={logo}
                  alt="admin"
                  className="m-auto h-10 w-10 rounded-md object-cover lg:h-28 lg:w-28"
                />
                <h5 className="mt-4 hidden text-xl font-semibold text-gray-600 lg:block dark:text-gray-300">
                  {name}
                </h5>
                <span className="hidden text-gray-400 lg:block">{role}</span>
              </div>

              <ul className="mt-8 space-y-2 tracking-wide">
                {navItems.map(item => (
                  <li
                    key={item.active}
                    onClick={() => {
                      setActiveLink(item.active);
                      navigate(item.path);
                      setMl();
                    }}
                  >
                    <a
                      href="javascript:void(0)"
                      aria-label={item.active}
                      className={
                        activeLink === item.active
                          ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-[#5e0d14] to-[#991e1e] px-1 py-2 text-white"
                          : "relative flex items-center space-x-4 rounded-xl px-1 py-2 text-gray-600"
                      }
                    >
                      {item.icon}
                      <span className="-mr-1 font-medium">{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="-mx-6 md:flex hidden items-center justify-between border-t px-6 pt-4 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600 dark:text-gray-300"
                aria-label="logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="group-hover:text-gray-700 dark:group-hover:text-white">
                  Logout
                </span>
              </button>
            </div>
          </aside>
          <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
            <div
              className={
                window.innerWidth < 768
                  ? "sticky md:z-50 top-0 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5"
                  : "sticky md:z-50 top-0 h-16 border-b bg-white dark:bg-gray-800 dark:border-gray-700 lg:py-2.5"
              }
            >
              <div className="flex items-center justify-between space-x-4 px-4 2xl:container h-full">
                <h5
                  hidden
                  className="text-2xl font-medium text-gray-600 lg:block dark:text-white"
                >
                  {activeLink.toUpperCase()}
                </h5>
                <h5
                  onClick={setMl}
                  className="text-2xl lg:hidden font-medium text-gray-600 dark:text-white"
                >
                  <AiOutlineMenu />
                </h5>
                <div className="flex space-x-4"></div>
              </div>
            </div>

            <div className="px-6 pt-6 bg-white">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/listcategory" element={<ListCategory />} />
                <Route path="/showbooking" element={<ShowBooking />} />
                <Route path="/limits" element={<Limits />} />
              </Routes>
            </div>
          </div>
        </section>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      )}
    </>
  );
};

export default App;
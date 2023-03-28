import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Outlet, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const Icon = ({ className }: any) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const navigation = [
  {
    name: "Employees",
    href: "/employees",
    icon: <i className="fa-sharp fa-solid fa-user-tie"></i>,
  },
  {
    name: "Contracts",
    href: "/contracts",
    icon: <i className="fa-sharp fa-solid fa-file-contract"></i>,
  },
  {
    name: "Recruitment",
    href: "/recruitment",
    icon: <i className="fa-sharp fa-solid fa-user-plus"></i>,
  },
  {
    name: "Departments",
    href: "/departments",
    icon: <i className="fa-sharp fa-solid fa-building"></i>,
  },
  {
    name: "Holidays",
    href: "/holidays",
    icon: <i className="fa-sharp fa-solid fa-gift"></i>,
  },
  {
    name: "Payslips",
    href: "/payslips",
    icon: <i className="fa-sharp fa-solid fa-cash-register"></i>,
  },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = JSON.parse(sessionStorage.getItem("user") || "{}");
  const handleLogout = () => {
    dispatch(logout());
    toast.success("User logged out successfully");
    navigate("/login");
  };

  const userNavigation = [
    { name: "Your Profile", href: "#" },
    {
      name: "Sign out",
      onClick: () => {
        handleLogout();
      },
    },
  ];

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-40 flex md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <i className="fa-sharp fa-solid fa-circle-xmark text-white h-5 w-5"></i>
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 px-4 flex items-center">
                  <img className="h-16 w-16" src={logo} alt="Workflow" />
                </div>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                          "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                        )}
                      >
                        {
                          item.icon /* Use curly braces to render the component */
                        }
                        <span className="ml-4">{item.name}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
            <div className="flex-shrink-0 px-4 flex items-center">
              <img className="h-16 w-16" src={logo} alt="Workflow" />
            </div>
            <div className="flex-grow mt-12 flex flex-col">
              <nav className="flex-1 px-4 pb-4 space-y-8">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      "group rounded-md py-2 px-2 flex items-center text-base font-medium"
                    )}
                  >
                    {item.icon /* Use curly braces to render the component */}
                    <span className="ml-4">{item.name}</span>
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div className="md:pl-64 bg-gray-50">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0 ">
            <div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <i className="fa-sharp fa-solid fa-bars h-6 w-6"></i>
              </button>
              <div className="flex-1 flex justify-end px-4 md:px-0">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                onClick={item.onClick}
                                className={classNames(
                                  active ? "bg-gray-100 cursor-pointer" : "",
                                  "block py-2 px-4 text-sm text-gray-700 cursor-pointer"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

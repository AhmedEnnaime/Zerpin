import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DepartmentCardProps } from "../PropsTypes";
import API from "./API";
import { toast } from "react-toastify";

const OptionsButton = ({ department }: DepartmentCardProps) => {
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const deleteDepartment = async () => {
    await API.delete(`departments/${department.id}`)
      .then((res) => {
        if (res.status === 202) {
          toast.success("Department deleted successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex-shrink-0 self-center flex">
      <Menu as="div" className="relative z-30 inline-block text-left">
        <div>
          <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <i className="fa-solid fa-ellipsis h-5 w-5" aria-hidden="true"></i>
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
          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={deleteDepartment}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm cursor-pointer"
                    )}
                  >
                    <i className="fa-sharp fa-solid fa-trash mr-3 h-5 w-5 text-red-600"></i>

                    <span className="text-red-600">Delete</span>
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "flex px-4 py-2 text-sm"
                    )}
                  >
                    <i className="fa-sharp fa-solid fa-pen mr-3 h-5 w-5 text-blue-600"></i>
                    <span className="text-blue-600">Edit</span>
                  </a>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default OptionsButton;

import { useEffect, useState } from "react";
import IDepartment from "../../../Interfaces/Department";
import IRecruitment from "../../../Interfaces/Recruitment";
import IUser from "../../../Interfaces/User";
import API from "../../../utils/API";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const PinnedSections = () => {
  const [departments, setDepartments] = useState<IDepartment[]>();
  const [jobs, setJobs] = useState<IRecruitment[]>();
  const [employees, setEmployees] = useState(0);

  const getDepartments = async () => {
    await API.get(`departments`)
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getJobs = async () => {
    await API.get(`recrutments`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmployees = async () => {
    await API.get(`users`)
      .then((res) => {
        setEmployees(res.data.total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pinnedSections = [
    {
      name: "Employees",
      initials: "EM",
      number: employees + " Employees",
      bgColorClass: "bg-pink-600",
    },

    {
      name: "Departments",
      initials: "DP",
      number: departments?.length + " Departments",
      bgColorClass: "bg-purple-600",
    },

    {
      name: "Active Jobs",
      initials: "AJ",
      number: jobs?.length + " Jobs",
      bgColorClass: "bg-green-400",
    },
  ];

  useEffect(() => {
    getDepartments();
    getJobs();
    getEmployees();
  }, []);
  return (
    <div className="px-4 mt-6 sm:px-6 lg:px-8">
      <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
        Pinned Sections
      </h2>
      <ul
        role="list"
        className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 mt-3"
      >
        {pinnedSections.map((section, key) => (
          <li
            key={key}
            className="relative col-span-1 flex shadow-sm rounded-md"
          >
            <div
              className={classNames(
                section.bgColorClass,
                "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
              )}
            >
              {section.initials}
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a
                  href="#"
                  className="text-gray-900 font-medium hover:text-gray-600"
                >
                  {section.name}
                </a>
                <p className="text-gray-500">{section.number}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PinnedSections;

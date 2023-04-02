import { useAppSelector } from "../../redux/hooks";
import { selectDepartment } from "../../redux/slices/departmentSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../redux/slices/authSlice";
import API from "../../utils/API";
import { toast } from "react-toastify";

const DepartmentEmployees = () => {
  const { department } = useAppSelector(selectDepartment);
  const { user } = useAppSelector(selectAuth);
  const auth = JSON.parse(sessionStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  const printPayslip = async (contract_id: number) => {
    await API.post(`createPayslip/${contract_id}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          toast.success("Payslip created successfully you can download it now");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <div className="px-4 mt-12 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              {department?.users?.length} Employees
            </h1>
          </div>
          <h1 className="text-2xl">{department?.name}</h1>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Position
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Cin
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Phone number
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Contract status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {department?.users ? (
                      department?.users.map((employee) => (
                        <tr key={employee.email}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="font-medium text-gray-900">
                                  {employee.fname} {employee.lname}
                                </div>
                                <div className="text-gray-500">
                                  {employee.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {employee.contract?.position}
                            </div>
                            <div className="text-gray-500">
                              {employee.contract?.position}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">{employee.cin}</div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {employee.phone}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                employee.contract?.state === "ONGOING"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {employee.contract?.state}
                            </span>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {employee.role}
                          </td>
                          {user?.role == "ADMIN" ? (
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button
                                onClick={() => {
                                  printPayslip(employee.contract?.id as number);
                                }}
                                className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                <i className="fa-sharp fa-solid fa-print pr-2"></i>
                                Print Payslip
                                <span className="sr-only">
                                  , {employee.fname} {employee.lname}
                                </span>
                              </button>
                            </td>
                          ) : (
                            ""
                          )}
                        </tr>
                      ))
                    ) : (
                      <h1>No user available in this department</h1>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DepartmentEmployees;

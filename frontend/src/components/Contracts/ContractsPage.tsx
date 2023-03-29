import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IContract from "../../Interfaces/Contract";
import IUser from "../../Interfaces/User";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import API from "../../utils/API";
import Navbar from "../Navbar";
import ContractCard from "./ContractCard";

const ContractsPage = () => {
  const auth = JSON.parse(sessionStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);
  const [contracts, setContracts] = useState<IContract[]>();
  const [rerender, setRerender] = useState(false);
  const [open, setOpen] = useState(false);
  const [contract, setContract] = useState<IContract>({
    ref: "",
    position: "",
    debut_date: "",
    final_date: "",
    base_salary: 0,
    final_salary: 0,
    user_id: 0,
    state: "ONGOING",
    user: {} as IUser,
  });

  const getContracts = async () => {
    await API.get(`contracts`)
      .then((res) => {
        setContracts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const finishContract = async (id: number) => {
    await API.delete(`contracts/${id}`)
      .then((res) => {
        if (res.status === 202) {
          toast.success("Contract finished successfully");
          setRerender(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getContract = async (id: number) => {
    await API.get(`contracts/${id}`)
      .then((res) => {
        setContract(res.data);
        setOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    } else if (user?.role == "CHEF" || user?.role == "EMPLOYEE") {
      navigate("/home");
    }
    getContracts();
  }, [rerender, open]);

  return (
    <>
      <div className="px-4 pb-4 sm:px-6 lg:px-4 mt-12">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Contracts</h1>
          </div>
        </div>
        <div className="mt-8 pb-4 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-4">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-6"
                      >
                        Ref
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Employee
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Debut date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Final date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Base Salary
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        Final Salary
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                      >
                        State
                      </th>
                      <th
                        scope="col"
                        className="relative py-3 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Renew Contract</span>
                      </th>
                      <th
                        scope="col"
                        className="relative py-3 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Finish Contract</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {contracts ? (
                      contracts.map((contract) => (
                        <tr key={contract.id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {contract.ref}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            <div className="text-gray-900">
                              {contract.user?.fname} {contract.user?.lname}
                            </div>
                            <div className="text-gray-500">
                              {contract.position}
                            </div>
                          </td>

                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {contract.debut_date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {contract.final_date
                              ? contract.final_date
                              : "undetermined"}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {contract.base_salary}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {contract.final_salary}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                contract?.state === "ONGOING"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {contract?.state}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              onClick={() => {
                                getContract(contract.id as number);
                                //setOpen(true);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                            >
                              Renew Contract
                              <span className="sr-only">
                                , {contract.user?.fname}
                              </span>
                            </a>
                          </td>

                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              onClick={() => {
                                finishContract(contract.id as number);
                              }}
                              className="text-red-600 hover:text-red-900 cursor-pointer"
                            >
                              Finish Contract
                              <span className="sr-only">
                                , {contract.user?.fname}
                              </span>
                            </a>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td>No contract available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open ? (
        <ContractCard
          open={open}
          setOpen={setOpen}
          contract={contract as IContract}
          setContract={setContract}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ContractsPage;

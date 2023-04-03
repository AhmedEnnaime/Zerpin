import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ContractCardProps } from "../../PropsTypes";
import IContract from "../../Interfaces/Contract";
import IDepartment from "../../Interfaces/Department";
import API from "../../utils/API";
import { toast } from "react-toastify";

const ContractCard = ({
  open,
  setOpen,
  contract,
  setContract,
}: ContractCardProps) => {
  const cancelButtonRef = useRef(null);
  const [departments, setDepartments] = useState<IDepartment[]>();
  const [img, setImg] = useState<File | null>(null);

  const [inputs, setInputs] = useState<IContract>({
    id: contract.id,
    user_id: contract.user_id,
    base_salary: contract.base_salary,
    final_salary: contract.final_salary,
    debut_date: contract.debut_date,
    final_date: contract.final_date,
    state: contract.state,
    rules: contract.rules,
    ref: contract.ref,
    user: contract.user,
    position: contract.position,
  });
  const getDepartments = async () => [
    await API.get(`departments`)
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log(err);
      }),
  ];

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setContract
      ? setContract((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      : "";
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files && e.target.files[0]);
    }
  };

  const renewContract = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(contract);
    const formData = new FormData();
    formData.append("fname", inputs.user?.fname as string);
    formData.append("lname", inputs.user?.lname as string);
    formData.append("birthday", inputs.user?.birthday as string);
    formData.append("cin", inputs.user?.cin as string);
    formData.append("phone", inputs.user?.phone as string);
    formData.append("email", inputs.user?.email as string);
    formData.append("password", inputs.user?.password as string);
    formData.append("role", inputs.user?.role as string);
    formData.append("position", contract.position);
    formData.append("img", img as File);
    formData.append("debut_date", contract.debut_date);
    formData.append("final_date", contract.final_date);

    if (inputs.user?.department_id !== null) {
      formData.append(
        "department_id",
        inputs.user?.department_id.toString() as string
      );
    }

    if (inputs.base_salary !== null) {
      formData.append("base_salary", contract.base_salary.toString());
    }

    const checkedValues: any = [];

    const checkboxes = document.querySelectorAll(
      "input[type=checkbox][name=rule_id]"
    );

    checkboxes.forEach((checkbox) => {
      const input = checkbox as HTMLInputElement;
      if (input.checked) {
        checkedValues.push(input.value);
      }
    });
    for (let ch of checkedValues) {
      formData.append("rule_id[]", ch);
    }

    await API.post(`renewContract/${contract.id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          setOpen(false);
          toast.success("Contract renewed successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDepartments();
  }, []);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="pt-8">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {contract.user?.fname} {contract.user?.lname}'s Contract
                    </h3>
                  </div>
                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-6">
                      <div className="mt-1 flex items-center">
                        <img
                          src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                          className="rounded-full w-12 h-12"
                          alt=""
                        />
                        {setContract ? (
                          <label
                            htmlFor="photo"
                            className="ml-5 cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Change
                            <input
                              type="file"
                              name="img"
                              onChange={handleImage}
                              id="photo"
                              className="ml-5 hidden bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            />
                          </label>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="fname"
                          value={inputs.user?.fname}
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          id="first-name"
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="last-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="lname"
                          id="last-name"
                          value={inputs.user?.lname}
                          onChange={handleChange}
                          // disabled={!setContract ?? true}
                          autoComplete="family-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          onChange={handleChange}
                          value={contract.user?.email}
                          // disabled={!setContract ?? true}
                          autoComplete="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="position"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cin
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="cin"
                          id="cin"
                          value={contract.user?.cin}
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          autoComplete="family-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="birthday"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Birthday
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="birthday"
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          value={contract.user?.birthday}
                          id="birthday"
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Department
                      </label>
                      <div className="mt-1">
                        <select
                          id="department"
                          name="department_id"
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          value={contract.user?.department_id as number}
                          autoComplete="country-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select department</option>
                          {departments
                            ? departments.map((department) => (
                                <option
                                  key={department.id}
                                  value={department.id}
                                >
                                  {department.name}
                                </option>
                              ))
                            : ""}
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone number
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="phone"
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          value={contract.user?.phone}
                          id="phone"
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="position"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Position
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="position"
                          id="position"
                          value={contract.position}
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          autoComplete="family-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Role
                      </label>
                      <div className="mt-1">
                        <select
                          id="role"
                          name="role"
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          value={contract.user?.role}
                          autoComplete="country-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        >
                          <option value="">Select role</option>
                          <option value="CHEF">CHEF</option>
                          <option value="EMPLOYEE">EMPLOYEE</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="debut_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Debut date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="debut_date"
                          onChange={handleChange}
                          value={contract.debut_date}
                          id="debut_date"
                          disabled={!setContract ?? true}
                          autoComplete="given-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="final_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Final date
                      </label>
                      <div className="mt-1">
                        <input
                          type="date"
                          name="final_date"
                          id="final_date"
                          value={contract.final_date || ""}
                          onChange={handleChange}
                          disabled={!setContract ?? true}
                          autoComplete="family-name"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                    <fieldset>
                      <legend className="text-base font-medium text-gray-900">
                        Rules
                      </legend>
                      <div className="mt-4 flex items-center gap-x-16">
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="ir"
                              name="ir"
                              type="checkbox"
                              defaultChecked
                              disabled
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="ir"
                              className="font-medium text-gray-700"
                            >
                              IR
                            </label>
                          </div>
                        </div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="transport"
                              name="rule_id"
                              onChange={handleChange}
                              value="2"
                              type="checkbox"
                              defaultChecked={contract.rules?.some(
                                (rule) => rule.id === 2
                              )}
                              disabled={!setContract ?? true}
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="candidates"
                              className="font-medium text-gray-700"
                            >
                              Transport
                            </label>
                          </div>
                        </div>
                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="panier"
                              name="rule_id"
                              onChange={handleChange}
                              defaultChecked={contract.rules?.some(
                                (rule) => rule.id === 3
                              )}
                              disabled={!setContract ?? true}
                              value="3"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="panier"
                              className="font-medium text-gray-700"
                            >
                              Panier
                            </label>
                          </div>
                        </div>

                        <div className="relative flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="amo"
                              name="rule_id"
                              onChange={handleChange}
                              defaultChecked={contract.rules?.some(
                                (rule) => rule.id === 1
                              )}
                              disabled={!setContract ?? true}
                              value="1"
                              type="checkbox"
                              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="amo"
                              className="font-medium text-gray-700"
                            >
                              AMO
                            </label>
                          </div>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Base Salary
                  </label>
                  <div className="mt-1">
                    <input
                      id="base_salary"
                      name="base_salary"
                      type="text"
                      onChange={handleChange}
                      value={contract.base_salary}
                      disabled={!setContract ?? true}
                      autoComplete="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
              {setContract ? (
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                    onClick={renewContract}
                  >
                    Renew
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ContractCard;

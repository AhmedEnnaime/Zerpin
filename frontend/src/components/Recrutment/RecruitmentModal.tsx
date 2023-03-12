import { RecruitmentModalProps } from "../../PropsTypes";
import { useState } from "react";
import IRecruitment from "../../Interfaces/Recruitment";

const RecruitmentModal = ({ open, setOpen }: RecruitmentModalProps) => {
  const [inputs, setInputs] = useState<IRecruitment>({
    title: "",
    position: "",
    number: 0,
    description: "",
    department_id: 0,
  });

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(inputs);
    setOpen(false);

    // await axios
    //   .post<Film>(`${url}/films/addFilms`, inputs)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status === 201) {
    //       setOpen(false);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div id="popup" className="z-50 fixed w-full flex justify-center inset-0">
      <div className="w-full h-full bg-gray-900 z-0 absolute inset-0" />
      <div className="mx-auto container">
        <div className="flex items-center justify-center h-full w-full">
          <div className="bg-white rounded-md shadow fixed overflow-y-auto sm:h-auto w-10/12 md:w-8/12 lg:w-1/2 2xl:w-2/5">
            <div className="bg-gray-100 rounded-tl-md rounded-tr-md px-4 md:px-8 md:py-4 py-7 flex items-center justify-between">
              <p className="text-base font-semibold">Create New Recruitment</p>
              <button
                className="focus:outline-none"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <svg
                  width={28}
                  height={28}
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 7L7 21"
                    stroke="#A1A1AA"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7L21 21"
                    stroke="#A1A1AA"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="px-4 md:px-10 pt-6 md:pb-4 pb-7">
              <form className="mt-6">
                <div className="flex items-center space-x-9">
                  <input
                    id="title"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={inputs.title}
                    className="w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                  />
                  <input
                    name="position"
                    placeholder="Position"
                    type="text"
                    onChange={handleChange}
                    value={inputs.position}
                    className="w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                  />
                </div>
                <div className="flex items-center space-x-9 mt-8">
                  <input
                    name="number"
                    placeholder="Number of needs"
                    type="number"
                    onChange={handleChange}
                    value={inputs.number}
                    className="w-1/2 focus:outline-none placeholder-gray-500 py-3 px-3 text-sm leading-none text-gray-800 bg-white border rounded border-gray-200"
                  />
                  <div className="w-1/2 bg-white border rounded border-gray-200 py-2.5 px-3">
                    <select
                      name="department_id"
                      className="text-sm text-gray-500 w-full focus:outline-none"
                      onChange={handleChange}
                      value={inputs.department_id}
                    >
                      <option value="3">HR</option>
                      <option value="4">Informatique</option>
                    </select>
                  </div>
                </div>
                <div className="mt-8">
                  <textarea
                    onChange={handleChange}
                    value={inputs.description}
                    name="description"
                    placeholder="Description"
                    className="py-3 pl-3 overflow-y-auto h-24 border rounded border-gray-200 w-full resize-none focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between mt-9">
                  <button
                    onClick={() => {
                      setOpen(false);
                    }}
                    className="px-6 py-3 bg-gray-400 hover:bg-gray-500 shadow rounded text-sm text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-400 hover:bg-opacity-80 shadow rounded text-sm"
                  >
                    Add Recruitment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentModal;

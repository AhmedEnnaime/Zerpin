import { useState } from "react";
import IHoliday from "../../../Interfaces/Holiday";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
import API from "../../../utils/API";
import { toast } from "react-toastify";

const RequestHoliday = () => {
  const { user } = useAppSelector(selectAuth);
  const [inputs, setInputs] = useState<IHoliday>({
    debut_date: "",
    final_date: "",
    user_id: user?.id as number,
    state: "WAITING",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const today = new Date();
    const selectedDate = new Date(value);
    if (selectedDate < today) {
      // the selected date is before today's date
      toast.error("You cannot select a date before today's date.");
    } else {
      setInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const debutDate = new Date(inputs.debut_date);
    const finalDate = new Date(inputs.final_date);
    if (finalDate <= debutDate) {
      // the final_date is not after the debut_date
      toast.error("The final date should be after the debut date.");
      return;
    }
    await API.post(`holidays`, inputs)
      .then((res) => {
        if (res.status === 201) {
          toast.success(
            "Holiday requested successfully you can wait for the response"
          );
          setInputs({
            debut_date: "",
            final_date: "",
            user_id: user?.id as number,
            state: "WAITING",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="px-2">
      <div className="flex flex-no-wrap items-start">
        <div className="w-full ">
          <div className="py-4 px-2">
            <div className="bg-white rounded shadow py-7">
              {/* end */}
              <div className="mt-10 px-7">
                <p className="text-xl font-semibold leading-tight text-gray-800">
                  Request Your Holiday
                </p>
                <div className="grid w-full grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-7 mt-7 ">
                  <div>
                    <p className="text-base font-medium leading-none text-gray-800">
                      From
                    </p>
                    <input
                      type="date"
                      name="debut_date"
                      value={inputs.debut_date}
                      onChange={handleChange}
                      className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                    />
                    <p className="mt-3 text-xs leading-3 text-gray-600">
                      Pick the debut date of holiday
                    </p>
                  </div>
                  <div>
                    <p className="text-base font-medium leading-none text-gray-800">
                      To
                    </p>
                    <input
                      type="date"
                      name="final_date"
                      value={inputs.final_date}
                      onChange={handleChange}
                      className="w-full p-3 mt-4 border border-gray-300 rounded outline-none focus:bg-gray-50"
                    />
                    <p className="mt-3 text-xs leading-[15px] text-gray-600">
                      Pick the debut date of holiday
                    </p>
                  </div>
                </div>
              </div>

              <hr className="h-[1px] bg-gray-100 my-14" />
              <div className="flex flex-col flex-wrap items-center justify-center w-full px-7 lg:flex-row lg:justify-end md:justify-end gap-x-4 gap-y-4">
                <button
                  onClick={handleSubmit}
                  type="submit"
                  className="bg-indigo-700 rounded hover:bg-indigo-600 transform duration-300 ease-in-out text-sm font-medium px-6 py-4 text-white lg:max-w-[144px] w-full "
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestHoliday;

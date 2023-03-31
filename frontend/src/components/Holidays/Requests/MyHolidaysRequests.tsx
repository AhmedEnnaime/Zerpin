import { useEffect, useState } from "react";
import IHoliday from "../../../Interfaces/Holiday";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
import API from "../../../utils/API";
import { toast } from "react-toastify";
import not_found from "../../../assets/3024051-removebg-preview.png";

const MyHolidaysRequests = () => {
  const { user } = useAppSelector(selectAuth);
  const [myHolidays, setMyHolidays] = useState<IHoliday[]>();
  const [show, setShow] = useState(false);
  const [rerender, setRerender] = useState(false);

  const getHolidaysRequest = async () => {
    try {
      const res = await API.get(`holidays`);
      const allHolidays = res.data;
      let myHolidays: IHoliday[] = [];

      myHolidays = allHolidays.filter(
        (myHoliday: IHoliday) => myHoliday.user_id === user?.id
      );

      setMyHolidays(myHolidays);
    } catch (err) {
      console.log(err);
    }
  };

  const cancelHoliday = async (id: number) => {
    await API.delete(`holidays/${id}`)
      .then((res) => {
        if (res.status === 202) {
          toast.success("Holiday canceled successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHolidaysRequest();
  }, [rerender]);
  return (
    <div className="flex items-center justify-center">
      <div className="md:w-96 rounded-md shadow-lg p-4 w-full bg-white">
        <h1 className="text-lg font-bold text-gray-800 leading-5 pt-2">
          My Holidays
        </h1>
        {myHolidays && myHolidays.length > 0 ? (
          myHolidays.map((myHoliday) => (
            <div key={myHoliday.id} className="pt-6 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                  <span className="text-blue-400 text-xs italic font-normal pl-1">
                    From {myHoliday.debut_date}
                  </span>
                </div>
                {myHoliday.state == "WAITING" ? (
                  <div
                    className="cursor-pointer"
                    onClick={() => setShow(!show)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={16}
                      height={4}
                      viewBox="0 0 16 4"
                      fill="none"
                    >
                      <path
                        d="M2.11191 2.83331C2.56925 2.83331 2.94 2.46021 2.94 1.99997C2.94 1.53973 2.56925 1.16663 2.11191 1.16663C1.65456 1.16663 1.28381 1.53973 1.28381 1.99997C1.28381 2.46021 1.65456 2.83331 2.11191 2.83331Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.90854 2.83331C8.36588 2.83331 8.73663 2.46021 8.73663 1.99997C8.73663 1.53973 8.36588 1.16663 7.90854 1.16663C7.45119 1.16663 7.08044 1.53973 7.08044 1.99997C7.08044 2.46021 7.45119 2.83331 7.90854 2.83331Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.705 2.83331C14.1623 2.83331 14.5331 2.46021 14.5331 1.99997C14.5331 1.53973 14.1623 1.16663 13.705 1.16663C13.2477 1.16663 12.877 1.53973 12.877 1.99997C12.877 2.46021 13.2477 2.83331 13.705 2.83331Z"
                        stroke="#6B7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="absolute z-40 right-0">
                      <div className="rounded bg-white shadow-xl">
                        {show && (
                          <ul className=" mt-1">
                            <li
                              onClick={() => {
                                cancelHoliday(myHoliday.id as number);
                              }}
                              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                            >
                              Delete
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <p className="text-sm leading-none pt-2 text-gray-600 dark:text-gray-100">
                Requested in {myHoliday.created_at?.split("T")[0]}
              </p>

              <div className="flex items-center justify-left">
                {myHoliday.state === "WAITING" && (
                  <div className="text-orange-500 bg-orange-200 py-1 px-2 rounded text-xs leading-3 mt-2">
                    Pending
                  </div>
                )}
                {myHoliday.state === "VALIDATED" && (
                  <div className="text-green-500 bg-green-200 py-1 px-2 rounded text-xs leading-3 mt-2">
                    Validated
                  </div>
                )}
                {myHoliday.state === "REJECTED" && (
                  <div className="text-red-500 bg-red-200 py-1 px-2 rounded text-xs leading-3 mt-2">
                    Rejected
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <img
            className="flex justify-center w-22 h-22"
            src={not_found}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default MyHolidaysRequests;

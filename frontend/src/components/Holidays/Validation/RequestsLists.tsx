import { Card, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import IHoliday from "../../../Interfaces/Holiday";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
import API from "../../../utils/API";
import not_found from "../../../assets/3973481-removebg-preview.png";

const RequestsLists = () => {
  const { user } = useAppSelector(selectAuth);
  const [holidaysRequests, setHolidaysRequests] = useState<IHoliday[]>();
  const [rerender, setRerender] = useState(false);

  const getHolidaysRequest = async () => {
    try {
      const res = await API.get(`holidays`);
      const allHolidays = res.data;
      let waitingHolidays: IHoliday[] = [];

      if (user?.role === "ADMIN") {
        waitingHolidays = allHolidays.filter(
          (holidayRequest: IHoliday) => holidayRequest.state === "WAITING"
        );
      } else if (user?.role === "CHEF") {
        waitingHolidays = allHolidays.filter(
          (holidayRequest: IHoliday) =>
            holidayRequest.state === "WAITING" &&
            holidayRequest.user?.department_id === user.department_id &&
            holidayRequest.user.role === "EMPLOYEE"
        );
      }

      setHolidaysRequests(waitingHolidays);
    } catch (err) {
      console.log(err);
    }
  };

  const validateHoliday = async (id: number) => {
    await API.patch(`validateHoliday/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Holiday validated successfully");
          setRerender(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const rejectHoliday = async (id: number) => {
    await API.patch(`rejectHoliday/${id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Holiday rejected successfully");
          setRerender(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserImage = (img: File) => {
    return `http://localhost/storage/${img}`;
  };

  useEffect(() => {
    getHolidaysRequest();
  }, [rerender]);
  return (
    <div className="w-full px-4">
      <Card className={`${user?.role != "ADMIN" ? "md:w-96" : ""}`}>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Latest Holidays Requests
          </h5>
          <div className="inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
            {holidaysRequests?.length}
          </div>
        </div>
        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {holidaysRequests && holidaysRequests?.length > 0 ? (
              holidaysRequests?.map((holidayRequest) => (
                <li key={holidayRequest.id} className="py-3 sm:py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-x-2 items-center">
                      <div className="shrink-0">
                        <img
                          className="h-8 w-8 rounded-full"
                          src={getUserImage(holidayRequest.user?.img as File)}
                          alt="Lana image"
                        />
                      </div>
                      <Tooltip
                        content={
                          <div>
                            From: {holidayRequest.debut_date.split("T")[0]}{" "}
                            <br />
                            To: {holidayRequest.final_date.split("T")[0]}
                          </div>
                        }
                        style="light"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {holidayRequest.user?.fname}{" "}
                            {holidayRequest.user?.lname}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {holidayRequest.user?.email}
                          </p>
                        </div>
                      </Tooltip>
                    </div>

                    <div className="inline-flex gap-x-2 items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button
                        onClick={() => {
                          validateHoliday(holidayRequest.id as number);
                        }}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-green-600 p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        Validate
                      </button>

                      <button
                        onClick={() => {
                          rejectHoliday(holidayRequest.id as number);
                        }}
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-red-600 p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex justify-center">
                <img
                  className="flex justify-center w-22 h-22"
                  src={not_found}
                  alt=""
                />
              </div>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default RequestsLists;

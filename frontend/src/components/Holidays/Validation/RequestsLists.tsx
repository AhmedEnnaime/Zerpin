import { Card, Tooltip } from "flowbite-react";
import { useEffect, useState } from "react";
import IHoliday from "../../../Interfaces/Holiday";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
import API from "../../../utils/API";

const RequestsLists = () => {
  const { user } = useAppSelector(selectAuth);
  const [holidaysRequests, setHolidaysRequests] = useState<IHoliday[]>();

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
            holidayRequest.user.department_id === user.department_id &&
            holidayRequest.user.role === "EMPLOYEE"
        );
      }

      setHolidaysRequests(waitingHolidays);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getHolidaysRequest();
  }, []);
  return (
    <div className="max-w-sm">
      <Card>
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
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                        alt="Lana image"
                      />
                    </div>
                    <Tooltip
                      content={
                        <div>
                          From: {holidayRequest.debut_date.split("T")[0]} <br />
                          To: {holidayRequest.final_date.split("T")[0]}
                        </div>
                      }
                      style="light"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {holidayRequest.user.fname}{" "}
                          {holidayRequest.user.lname}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {holidayRequest.user.email}
                        </p>
                      </div>
                    </Tooltip>
                    <div className="inline-flex gap-x-2 items-center text-base font-semibold text-gray-900 dark:text-white">
                      <button className="inline-flex items-center rounded-lg border border-gray-300 bg-green-600 p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        Validate
                      </button>

                      <button className="inline-flex items-center rounded-lg border border-gray-300 bg-red-600 p-2 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        Reject
                      </button>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex justify-center">
                <h1>No Holiday is requested</h1>
              </div>
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default RequestsLists;

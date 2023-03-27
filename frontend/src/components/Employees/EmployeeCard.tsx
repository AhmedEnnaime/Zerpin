import { Card } from "flowbite-react";
import { useState } from "react";
import IContract from "../../Interfaces/Contract";
import { EmployeeCardProps } from "../../PropsTypes";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import ContractCard from "../Contracts/ContractCard";

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(selectAuth);
  const now = new Date();
  // const currentDate = now.toISOString().split("T")[0];
  // console.log(currentDate);

  return (
    <div className="max-w-sm">
      <Card>
        <div className="flex justify-end px-4 pt-4"></div>
        <div className="flex flex-col items-center pb-10">
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {employee.fname} {employee.lname}
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {employee.contract?.position}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6">
            <>
              {user?.role == "ADMIN" ? (
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  View contract
                </button>
              ) : (
                ""
              )}

              {employee.holidays && employee.holidays.length > 0 ? (
                employee.holidays.map((holiday) => {
                  const holidayStart = new Date(holiday.debut_date);
                  const holidayEnd = new Date(holiday.final_date);
                  if (
                    now >= holidayStart &&
                    now <= holidayEnd &&
                    holiday.state == "VALIDATED"
                  ) {
                    return (
                      <button
                        key={holiday.id}
                        disabled
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-yellow-500 py-2 px-4 text-center text-sm font-medium text-white hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        In Holiday
                      </button>
                    );
                  } else {
                    return (
                      <button
                        key={holiday.id}
                        disabled
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                      >
                        In Work
                      </button>
                    );
                  }
                })
              ) : (
                <button
                  disabled
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  In Work
                </button>
              )}
            </>
          </div>
        </div>
      </Card>
      {open ? (
        <ContractCard
          open={open}
          setOpen={setOpen}
          contract={employee.contract as IContract}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default EmployeeCard;

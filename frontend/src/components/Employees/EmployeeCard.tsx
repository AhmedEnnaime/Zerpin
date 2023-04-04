import { Card } from "flowbite-react";
import { useState } from "react";
import IContract from "../../Interfaces/Contract";
import { EmployeeCardProps } from "../../PropsTypes";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import Badge from "../../utils/Badge";
import ContractCard from "../Contracts/ContractCard";

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(selectAuth);
  const now = new Date();

  const getUserImage = (img: File) => {
    return `http://localhost/storage/${img}`;
  };

  return (
    <div className="">
      <Card className="w-72 p-0">
        <div className="flex justify-end">
          {employee.holidays && employee.holidays.length > 0 ? (
            <>
              {employee.holidays.every((holiday) => {
                const holidayStart = new Date(holiday.debut_date);
                const holidayEnd = new Date(holiday.final_date);
                return (
                  now < holidayStart ||
                  now > holidayEnd ||
                  holiday.state !== "VALIDATED"
                );
              }) ? (
                <Badge status="Working" />
              ) : (
                <Badge status="In Holiday" />
              )}
            </>
          ) : (
            <Badge status="Working" />
          )}
        </div>
        <div
          onClick={() => {
            {
              user?.role == "ADMIN" ? setOpen(true) : "";
            }
          }}
          className="flex flex-col items-center cursor-pointer"
        >
          <img
            className="mb-3 h-24 w-24 rounded-full shadow-lg"
            src={getUserImage(employee.img as File)}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
            {employee.fname} {employee.lname}
          </h5>

          <span className="text-sm text-gray-500 dark:text-gray-400">
            {employee.contract?.position}
          </span>
          <div className="mt-4 flex space-x-3 lg:mt-6 p-4 rounded-sm w-full bg-blue-100">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-between gap-x-4">
                <div className="flex flex-col items-start">
                  <h5 className="text-xs text-gray-500">Department</h5>
                  <p className="text-sm">{employee.department?.name}</p>
                </div>

                <div className="flex flex-col items-start">
                  <h5 className="text-xs text-gray-500">Date Hired</h5>
                  <p className="text-sm">
                    {employee.created_at?.split("T")[0]}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-start gap-x-2">
                <i className="fa-sharp fa-solid fa-envelope text-xs"></i>
                <p className="tex-xs">{employee.email}</p>
              </div>

              <div className="flex items-center justify-start gap-x-2">
                <i className="fa-sharp fa-solid fa-phone text-xs"></i>
                <p className="tex-xs">{employee.phone}</p>
              </div>
            </div>
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

import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import IHoliday from "../../Interfaces/Holiday";
import IUser from "../../Interfaces/User";
import API from "../../utils/API";

const HolidaysList = () => {
  const [holidays, setHolidays] = useState<IHoliday[]>();
  const [rerender, setRerender] = useState(false);

  const getHolidays = async () => {
    const year = new Date().getFullYear();
    await API.get(`holidays`)
      .then((res) => {
        const filteredHolidays = res.data.filter(
          (holiday: IHoliday) =>
            holiday.debut_date.includes(year.toString()) &&
            holiday.final_date.includes(year.toString())
        );
        setHolidays(filteredHolidays);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHoliday = async (id: number) => {
    await API.delete(`holidays/${id}`)
      .then((res) => {
        if (res.status === 202) {
          toast.success("Holiday deleted successfully");
          setRerender(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDaysTakenThisYear = (user: IUser) => {
    if (!holidays || holidays.length === 0) {
      return 0;
    }
    const year = new Date().getFullYear();
    const holidaysThisYear = holidays.filter(
      (holiday) =>
        holiday.user.id === user.id &&
        holiday.state === "VALIDATED" &&
        holiday.debut_date.includes(year.toString()) &&
        holiday.final_date.includes(year.toString())
    );
    return holidaysThisYear.reduce(
      (acc, holiday) => acc + getHolidayDuration(holiday),
      0
    );
  };

  const getHolidayDuration = (holiday: IHoliday) => {
    const start = new Date(holiday.debut_date);
    const end = new Date(holiday.final_date);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  useEffect(() => {
    getHolidays();
  }, [rerender]);
  return (
    <Table>
      <Table.Head>
        <Table.HeadCell>Employee</Table.HeadCell>
        <Table.HeadCell>Days taken in this year</Table.HeadCell>
        <Table.HeadCell>Role</Table.HeadCell>
        <Table.HeadCell>Date of request</Table.HeadCell>
        <Table.HeadCell>From</Table.HeadCell>
        <Table.HeadCell>To</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">Delete</span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {holidays ? (
          holidays.map((holiday) => (
            <Table.Row
              key={holiday.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {holiday.user.fname} {holiday.user.lname}
              </Table.Cell>
              <Table.Cell>{getDaysTakenThisYear(holiday.user)} days</Table.Cell>
              <Table.Cell>{holiday.user.role}</Table.Cell>
              <Table.Cell>{holiday.created_at?.split("T")[0]}</Table.Cell>
              <Table.Cell>{holiday.debut_date.split("T")[0]}</Table.Cell>
              <Table.Cell>{holiday.final_date.split("T")[0]}</Table.Cell>
              <Table.Cell>
                {holiday.state === "VALIDATED" ? (
                  <i className="fa-sharp fa-solid fa-circle-check text-green-600"></i>
                ) : holiday.state === "WAITING" ? (
                  <i className="fa-sharp fa-solid fa-clock-rotate-left text-orange-300"></i>
                ) : (
                  <i className="fa-sharp fa-solid fa-circle-xmark text-red-600"></i>
                )}
              </Table.Cell>
              <Table.Cell>
                <button
                  onClick={() => {
                    deleteHoliday(holiday.id as number);
                  }}
                  className="font-medium text-red-600 hover:underline dark:text-blue-500"
                >
                  Delete
                </button>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell>
              <h1>No holiday available</h1>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};

export default HolidaysList;

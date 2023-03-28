import { useEffect, useState } from "react";
import IUser from "../../Interfaces/User";
import API from "../../utils/API";
import Navbar from "../Navbar";
import EmployeeCard from "./EmployeeCard";
import ReactPaginate from "react-paginate";

const EmployeesPage = () => {
  const [users, setUsers] = useState<IUser[]>();
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const getEmployees = async () => {
    await API.get(`users?page=${activePage + 1}`)
      .then((res) => {
        setUsers(res.data.data);
        setTotalPages(res.data.last_page);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (selectedPage: any) => {
    setActivePage(selectedPage.selected);
  };
  useEffect(() => {
    getEmployees();
  }, [activePage]);

  return (
    <>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-8 pb-4">
        {users ? (
          users.map((user) => <EmployeeCard key={user.id} employee={user} />)
        ) : (
          <h1>No user available</h1>
        )}
      </div>
      <ReactPaginate
        pageCount={totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"flex items-center justify-end my-6"}
        pageClassName="bg-gray-200 hover:bg-gray-300 text-gray-700 mx-1 rounded-full px-3 py-2 cursor-pointer"
        activeClassName="bg-blue-600 text-white"
      />
    </>
  );
};

export default EmployeesPage;

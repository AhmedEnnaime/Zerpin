import Navbar from "../Navbar";
import Card from "./Card";
import { useEffect, useState } from "react";
import DepartmentModal from "./DepartmentModal";
import API from "../../utils/API";
import IDepartment from "../../Interfaces/Department";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import SideBar from "../SideBar";

const DepartmentPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [departments, setDepartments] = useState<IDepartment[]>();
  const { user } = useAppSelector(selectAuth);
  const getDepartments = async () => {
    await API.get(`departments`)
      .then((res) => {
        setDepartments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDepartments();
  }, [open]);

  return (
    <>
      <div className="flex justify-end px-4">
        {user?.role == "ADMIN" ? (
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="p-4"
          >
            Add Department
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-12">
        {departments ? (
          departments.map((department) => (
            <Card key={department.id} department={department} />
          ))
        ) : (
          <h1>No department available</h1>
        )}
      </div>
      {open ? <DepartmentModal open={open} setOpen={setOpen} /> : ""}
    </>
  );
};
export default DepartmentPage;

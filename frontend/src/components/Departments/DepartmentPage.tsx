import Navbar from "../Navbar";
import Card from "./Card";
import { useEffect, useState } from "react";
import DepartmentModal from "./DepartmentModal";
import API from "../../utils/API";
import IDepartment from "../../Interfaces/Department";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import { Button } from "flowbite-react";

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
      <div className="flex justify-between px-4 mt-8">
        <h2 className="text-2xl">{departments?.length} Departments</h2>
        {user?.role == "ADMIN" ? (
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            Add Department
          </Button>
        ) : (
          ""
        )}
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-4">
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

import Navbar from "../Navbar";
import Card from "./Card";
import { useState } from "react";
import DepartmentModal from "./DepartmentModal";

const DepartmentPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex justify-end px-4">
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="p-4"
        >
          Add Department
        </button>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-12">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      {open ? <DepartmentModal open={open} setOpen={setOpen} /> : ""}
    </>
  );
};
export default DepartmentPage;

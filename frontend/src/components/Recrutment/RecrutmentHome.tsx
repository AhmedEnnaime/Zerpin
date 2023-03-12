import Navbar from "../Navbar";
import RecruitmentModal from "./RecruitmentModal";
import { useState } from "react";
// import SuccessNotification from "../../utils/SuccessNotification";

const RecruitmentHome = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div className="flex justify-between p-8">
        <h1 className="text-4xl font-bold">Recruitment</h1>
        <button
          onClick={() => {
            setOpen(true);
          }}
          type="button"
          className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <i className="fa-sharp fa-solid fa-plus h-6 w-6"></i>
        </button>
      </div>
      {open ? <RecruitmentModal open={open} setOpen={setOpen} /> : ""}
    </>
  );
};
export default RecruitmentHome;

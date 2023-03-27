import Navbar from "../Navbar";
import RecruitmentModal from "./RecruitmentModal";
import { useEffect, useState } from "react";
import RecruitmentCard from "./RecruitmentCard";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import API from "../../utils/API";
import IRecruitment from "../../Interfaces/Recruitment";

const RecruitmentHome = () => {
  const [open, setOpen] = useState(false);
  const { user } = useAppSelector(selectAuth);
  const [recruitments, setRecruitments] = useState<IRecruitment[]>();

  const getRecruitments = async () => {
    await API.get(`recrutments`)
      .then((res) => {
        setRecruitments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRecruitments();
  }, [open]);

  return (
    <>
      <Navbar />
      <div className="flex justify-between p-8">
        <h1 className="text-4xl font-bold">Recruitment</h1>
        <div className="flex justify-end px-12">
          {user?.role == "ADMIN" ? (
            <button
              onClick={() => {
                setOpen(true);
              }}
              type="button"
              className="inline-flex items-center p-4 border border-transparent rounded-full shadow-sm text-white bg-blue-200 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <i
                className="fa-sharp fa-solid fa-plus text-black"
                aria-hidden="true"
              ></i>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-12">
        {recruitments ? (
          recruitments.map((recruitment) => (
            <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
          ))
        ) : (
          <h1>No recruitment available</h1>
        )}
      </div>
      {open ? <RecruitmentModal open={open} setOpen={setOpen} /> : ""}
    </>
  );
};
export default RecruitmentHome;

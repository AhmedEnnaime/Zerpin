import RecruitmentModal from "./RecruitmentModal";
import { useEffect, useState } from "react";
import RecruitmentCard from "./RecruitmentCard";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import API from "../../utils/API";
import IRecruitment from "../../Interfaces/Recruitment";
import { Button } from "flowbite-react";

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
      <div className="flex justify-between mt-8">
        <h1 className="text-2xl">{recruitments?.length} Active Jobs</h1>
        <div className="flex justify-end px-12">
          {user?.role == "ADMIN" ? (
            <Button
              onClick={() => {
                setOpen(true);
              }}
            >
              <i
                className="fa-sharp p-1 fa-solid fa-plus text-sm text-white"
                aria-hidden="true"
              ></i>
              Add Job
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-12 pb-4">
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

import { toast } from "react-toastify";
import { RecruitmentCardProps } from "../../PropsTypes";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import API from "../../utils/API";

const RecruitmentCard = ({ recruitment }: RecruitmentCardProps) => {
  const { user } = useAppSelector(selectAuth);
  const deleteRecruitment = async (id: number) => {
    await API.delete(`recruitments/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 202) {
          toast.success("Recruitment deleted successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex items-center w-full justify-center py-8">
      <div className="max-w-sm rounded shadow bg-blue-200">
        <div className="flex">
          <div className="px-6 py-5">
            <p className="text-base font-medium leading-none text-gray-800">
              {recruitment.title}
            </p>
            <p className="text-xs leading-3 text-gray-800 pt-2">
              {recruitment.position}
            </p>
            <p className="text-xl font-semibold leading-tight text-gray-800 pt-6">
              {recruitment.number} Places
            </p>
            <div className="pt-4">
              {user?.role == "ADMIN" ? (
                <button className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-400 rounded hover:bg-blue-500 focus:outline-none">
                  View Candidates
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="px-3">
            <img src="https://i.ibb.co/34gPtCT/bg.png" alt="medal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCard;

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { RecruitmentCardProps } from "../../PropsTypes";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import { setRecruitment } from "../../redux/slices/recruitmentSlice";
import API from "../../utils/API";

const RecruitmentCard = ({ recruitment }: RecruitmentCardProps) => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const deleteRecruitment = async (id: number) => {
    await API.delete(`recrutments/${id}`)
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
    <div className="flex items-center justify-center">
      <div
        className={`md:w-96 border-t-4 ${
          recruitment.candidates &&
          recruitment.candidates.length >= recruitment.number
            ? "border-red-600"
            : "border-green-600"
        } rounded-md shadow-lg p-4 w-full dark:bg-gray- bg-white`}
      >
        <h1 className="text-lg font-bold text-gray-800 leading-5 pt-2">
          {recruitment.position}
        </h1>
        <div className="pt-12 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className=" text-xs font-normal pl-1">Candidates</span>
            </div>
          </div>
          <div className="flex items-center bg-blue-100 p-4 rounded-sm mt-4 justify-start">
            <div className="flex items-left gap-x-2">
              <div className="mt-2 h-16 w-2 border-l-2 border-gray-500"></div>
              <div className="flex flex-col items-center gap-y-1 p-2">
                <h3 className="text-gray-500">APPLIED</h3>
                <p className="text-3xl">{recruitment.candidates?.length}</p>
              </div>

              <div className="mt-2 h-16 w-2 border-l-2 border-gray-500 ml-8"></div>
              <div className="flex flex-col items-center gap-y-1 p-2">
                <h3 className="text-gray-500">WANTED</h3>
                <p className="text-3xl">{recruitment.number}</p>
              </div>
            </div>
          </div>
          {user?.role == "ADMIN" ? (
            <>
              <div className="flex justify-center mt-8">
                <hr className="w-11/12" />
              </div>

              <div
                onClick={() => {
                  dispatch(setRecruitment(recruitment));
                  navigate("/candidates");
                }}
                className="flex items-center gap-x-2 justify-between p-2 cursor-pointer "
              >
                <div
                  onClick={() => {
                    deleteRecruitment(recruitment.id as number);
                  }}
                  className="hover:underline"
                >
                  <p className="text-gray-500 text-xs">Delete</p>
                </div>
                <div className="flex items-center hover:underline">
                  <p className="text-gray-500 text-xs">See Candidates</p>
                  <i className="fa-sharp fa-solid fa-arrow-right text-xs text-gray-500"></i>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCard;

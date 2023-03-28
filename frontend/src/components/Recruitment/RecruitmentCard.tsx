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
    <div className="flex items-center justify-center">
      <div className="md:w-96 rounded-md shadow-lg py-800 4 px-5 w-full dark:bg-gray- bg-white">
        <h2 className="text-xs leading-3 text-gray-600 dark:text-gray-100">
          Tasks
        </h2>
        <h1 className="text-lg font-bold text-gray-800 leading-5 pt-2">
          25th January, Monday
        </h1>
        <div className="pt-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-purple-400 text-xs italic font-normal pl-1">
                11:30 AM
              </span>
            </div>
          </div>
          <p className="text-sm leading-none pt-2 text-gray-600 dark:text-gray-100">
            Meeting with stake holders
          </p>
          <p className="text-xs italic pt-1 leading-3 text-gray-400">
            Discussion on the template design
          </p>
          <div className="flex items-center justify-left">
            <div className="text-green-500 bg-green-200 py-1 px-2 rounded text-xs leading-3 mt-2">
              Completed
            </div>
          </div>
        </div>
        <div className="pt-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-blue-400 text-xs italic font-normal pl-1">
                1:00 AM
              </span>
            </div>
          </div>
          <p className="text-sm leading-none pt-2 text-gray-600 dark:text-gray-100">
            Design spring discussion
          </p>
          <p className="text-xs italic pt-1 leading-3 text-gray-400">
            Plan next weeks design sprint
          </p>
          <div className="flex items-center justify-left">
            <div className="text-red-500 bg-red-200 py-1 px-2 rounded text-xs leading-3 mt-2">
              Pending
            </div>
          </div>
        </div>
        <div className="pt-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-pink-400" />
              <span className="text-pink-400 text-xs italic font-normal pl-1">
                2:30 PM
              </span>
            </div>
          </div>
          <p className="text-sm leading-none pt-2 text-gray-600 dark:text-gray-100">
            Finalise marketing plan
          </p>
          <p className="text-xs italic pt-1 leading-3 text-gray-400">
            Define channels for content
          </p>
          <div className="flex items-center justify-left">
            <div className="text-red-500 bg-red-200 py-1 px-2 rounded text-xs leading-3 mt-2">
              Pending
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="flex items-center w-full justify-center py-8">
    //   <div className="max-w-sm rounded shadow bg-blue-200">
    //     <div className="flex">
    //       <div className="px-6 py-5">
    //         <p className="text-base font-medium leading-none text-gray-800">
    //           {recruitment.title}
    //         </p>
    //         <p className="text-xs leading-3 text-gray-800 pt-2">
    //           {recruitment.position}
    //         </p>
    //         <p className="text-xl font-semibold leading-tight text-gray-800 pt-6">
    //           {recruitment.number} Places
    //         </p>
    //         <div className="pt-4">
    //           {user?.role == "ADMIN" ? (
    //             <button
    //               onClick={() => {
    //                 dispatch(setRecruitment(recruitment));
    //                 navigate("/candidates");
    //               }}
    //               className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-400 rounded hover:bg-blue-500 focus:outline-none"
    //             >
    //               View Candidates
    //             </button>
    //           ) : (
    //             ""
    //           )}
    //         </div>
    //       </div>
    //       <div className="px-3">
    //         <img src="https://i.ibb.co/34gPtCT/bg.png" alt="medal" />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default RecruitmentCard;

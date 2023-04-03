import { DepartmentCardProps } from "../../PropsTypes";
import OptionsButton from "../../utils/OptionsButton";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setDepartment } from "../../redux/slices/departmentSlice";
import { useNavigate } from "react-router-dom";
import { selectAuth } from "../../redux/slices/authSlice";

const Card = ({ department }: DepartmentCardProps) => {
  const chef = department.users?.find((user) => user.role === "CHEF");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);

  const getUserImage = (img: File) => {
    return `http://localhost/storage/${img}`;
  };

  return (
    <>
      <div className="w-full py-10">
        <div className="container mx-auto px-6 flex items-start justify-center">
          <div className="w-full">
            <div className="mx-auto w-full p-5 lg:p-10 bg-white dark:bg-gray-800 shadow rounded">
              <div className="flex flex-col items-start">
                <div className="w-full pr-0">
                  <div className="flex items-center justify-between">
                    <div className="flex ">
                      <div className="w-12 h-12 rounded">
                        <img
                          className="w-full h-full overflow-hidden object-cover rounded object-center"
                          src="https://tuk-cdn.s3.amazonaws.com/assets/components/grid_cards/gc_28.png"
                          alt="logo"
                        />
                      </div>
                      <div className="ml-2">
                        <h5 className="text-gray-800 dark:text-gray-100 font-medium text-base">
                          {department.name}
                        </h5>
                        <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">
                          {department.created_at?.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    {user?.role == "ADMIN" ? (
                      <OptionsButton department={department} />
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="mt-5 text-sm text-gray-600 dark:text-gray-400 font-normal">
                    {department.description}
                  </p>
                </div>
                <div className="w-full flex flex-col items-start">
                  <div className="mr-12 flex items-center mt-5">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl leading-6 mb-1">
                      {department.users?.length}
                    </h2>
                    <p className="ml-2 text-gray-800 dark:text-gray-100 text-xl leading-5 text-center">
                      Employees
                    </p>
                  </div>
                  <div className="mr-12 flex items-center mt-5">
                    <h2 className="text-gray-600 dark:text-gray-400 font-bold text-xl leading-6 mb-1">
                      <img
                        className="w-12 h-12 overflow-hidden object-cover rounded-full"
                        src={getUserImage(chef?.img as File)}
                        alt="avatar"
                      />
                    </h2>
                    <div className="ml-2 text-gray-800 dark:text-gray-100 text-xl leading-5">
                      <>
                        {chef?.fname} {chef?.lname}
                        <p className="text-gray-600 dark:text-gray-400 text-xs font-normal">
                          Department Chef
                        </p>
                      </>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <hr className="mt-8 mb-8 h-1 rounded bg-gray-200" />
                <hr className="absolute top-0 h-1 w-2/3 rounded bg-indigo-400" />
              </div>
              <div className="flex flex-col items-start">
                <div
                  onClick={() => {
                    dispatch(setDepartment(department));
                    navigate("/departmentEmployees");
                  }}
                  className="flex items-center w-full justify-start cursor-pointer"
                >
                  {department.users
                    ? department.users?.slice(0, 4).map((user, key) => (
                        <div
                          key={key}
                          className="border-2 border-white dark:border-gray-700 shadow rounded-full w-10 h-10"
                        >
                          <img
                            className="w-10 h-10 overflow-hidden object-cover rounded-full"
                            src={getUserImage(user.img as File)}
                            alt="avatar"
                          />
                        </div>
                      ))
                    : ""}
                  {department.users && department.users?.length > 4 ? (
                    <p className="text-xs font-normal cursor-pointer hover:underline">
                      +{department.users.length - 4} more
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;

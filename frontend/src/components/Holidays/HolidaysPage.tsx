import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import HolidaysList from "./HolidaysList";
import MyHolidaysRequests from "./Requests/MyHolidaysRequests";
import RequestHoliday from "./Requests/RequestHoliday";
import RequestsLists from "./Validation/RequestsLists";

const HolidaysPage = () => {
  const { user } = useAppSelector(selectAuth);
  const auth = JSON.parse(sessionStorage.getItem("user") || "{}");
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {user?.role == "ADMIN" ? (
        <div className="flex mt-10 flex-col gap-y-4 items-center">
          <div className="px-6">
            <HolidaysList />
          </div>
          <div className="flex justify-center w-full">
            <RequestsLists />
          </div>
        </div>
      ) : (
        <div className="flex justify-between mt-12">
          <div className="w-3/5 px-6">
            <RequestHoliday />
          </div>
          <div className="flex flex-col items-center gap-y-6">
            {user?.role == "CHEF" ? (
              <>
                <MyHolidaysRequests />
                <RequestsLists />
              </>
            ) : (
              <MyHolidaysRequests />
            )}
          </div>
          <div></div>
        </div>
      )}
      {/* <div className="flex justify-between mt-12">
        <div className="w-3/5 px-6">
          {user?.role == "ADMIN" ? <HolidaysList /> : <RequestHoliday />}
        </div>
        <div className="flex flex-col items-center gap-y-6">
          {user?.role == "ADMIN" ? (
            <RequestsLists />
          ) : user?.role == "CHEF" ? (
            <>
              <MyHolidaysRequests />
              <RequestsLists />
            </>
          ) : (
            <MyHolidaysRequests />
          )}
        </div>
      </div> */}
    </>
  );
};

export default HolidaysPage;

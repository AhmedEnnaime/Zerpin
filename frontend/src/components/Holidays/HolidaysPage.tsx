import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import Navbar from "../Navbar";
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
      <Navbar />
      <div className="flex w-full mt-12">
        <div className="w-3/4">
          {user?.role == "ADMIN" ? <HolidaysList /> : <RequestHoliday />}
        </div>
        <div className="flex flex-col gap-y-6 w-1/3">
          {user?.role == "ADMIN" ? (
            <RequestsLists />
          ) : user?.role == "CHEF" ? (
            <>
              <RequestsLists />
              <MyHolidaysRequests />
            </>
          ) : (
            <MyHolidaysRequests />
          )}
        </div>
      </div>
    </>
  );
};

export default HolidaysPage;

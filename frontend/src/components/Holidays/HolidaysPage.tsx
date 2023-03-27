import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import Navbar from "../Navbar";
import HolidaysList from "./HolidaysList";
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
        <div className="w-1/3">
          {user?.role == "ADMIN" || user?.role == "CHEF" ? (
            <RequestsLists />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default HolidaysPage;

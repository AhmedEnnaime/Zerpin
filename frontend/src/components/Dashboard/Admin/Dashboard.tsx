import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
import Container from "../Employee/Container";
import Profile from "../Employee/Profile";
import BarChart from "./BarChart";
import Jobs from "./Jobs";
import PieChart from "./PieChart";
import PinnedSections from "./PinnedSections";

const Dashboard = () => {
  const auth = JSON.parse(sessionStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {user?.role == "ADMIN" ? (
        <div className="flex flex-col gap-y-8 pb-4">
          <PinnedSections />
          <div className="flex flex-col items-center mt-8 pb-4">
            <div className="flex gap-x-8 px-4 justify-between w-full">
              <div className="flex w-full p-2">
                <Jobs />
              </div>
              <div className="flex rounded items-center bg-white shadow w-1/3">
                <PieChart />
              </div>
            </div>

            <div className="w-full mt-2">
              <BarChart />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col">
          <Container />
        </div>
      )}
    </>
  );
};

export default Dashboard;

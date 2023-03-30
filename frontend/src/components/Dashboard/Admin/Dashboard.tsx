import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
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
      <div className="flex flex-col gap-y-8 pb-4">
        {user?.role == "ADMIN" ? <PinnedSections /> : ""}
        <div className="flex flex-col items-center mt-8">
          <div className="flex gap-x-4 px-4 justify-between w-full">
            <div className="flex w-2/3 p-2 rounded bg-white shadow">
              <PieChart />
            </div>
            <div className="flex w-1/3 p-2">
              <Jobs />
            </div>
          </div>

          <div className="w-full mt-2">
            <BarChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
import BarChart from "./BarChart";
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
      <div className="flex flex-col gap-y-8">
        {user?.role == "ADMIN" ? <PinnedSections /> : ""}
        <div className="flex justify-between items-center mt-8">
          <div className="flex items-center gap-x-4 px-4 justify-between w-full">
            <div className="flex w-2/3 rounded bg-white shadow">
              <BarChart />
            </div>
            <div className="flex w-1/3 p-2 rounded bg-white shadow">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

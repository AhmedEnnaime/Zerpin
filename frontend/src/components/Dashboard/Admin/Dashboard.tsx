import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
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
  return <>{user?.role == "ADMIN" ? <PinnedSections /> : ""}</>;
};

export default Dashboard;

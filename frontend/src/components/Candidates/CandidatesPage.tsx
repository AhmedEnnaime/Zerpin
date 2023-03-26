import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import { selectRecruitment } from "../../redux/slices/recruitmentSlice";
import Navbar from "../Navbar";

const CandidatesPage = () => {
  const { recruitment } = useAppSelector(selectRecruitment);
  const auth = JSON.parse(sessionStorage.getItem("user") || "{}");
  const navigate = useNavigate();
  const { user } = useAppSelector(selectAuth);

  useEffect(() => {
    if (!auth.token || user?.role != "ADMIN") {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <Navbar />
    </>
  );
};

export default CandidatesPage;

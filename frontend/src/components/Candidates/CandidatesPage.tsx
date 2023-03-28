import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import { selectRecruitment } from "../../redux/slices/recruitmentSlice";
import Navbar from "../Navbar";
import DragAndDrop from "./DragAndDrop";

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
      <h1 className="mt-12 text-left text-2xl">
        Candidates of {recruitment?.position}
      </h1>

      <DragAndDrop />
    </>
  );
};

export default CandidatesPage;

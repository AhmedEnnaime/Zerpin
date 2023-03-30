import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../../redux/slices/authSlice";
import { selectRecruitment } from "../../redux/slices/recruitmentSlice";
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
      <h1 className="mt-8 text-3xl">{recruitment?.position}</h1>

      <h2 className="mt-16 font-bold ml-12">
        Total Candidates{" "}
        <span className="bg-green-700 py-1 px-2 text-white rounded-md">
          {" "}
          {recruitment?.candidates?.length}{" "}
        </span>{" "}
      </h2>

      <DragAndDrop />
    </>
  );
};

export default CandidatesPage;

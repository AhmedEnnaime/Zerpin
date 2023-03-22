import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RecruitmentHome from "./components/Recrutment/RecrutmentHome";
import DepartmentPage from "./components/Departments/DepartmentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { setUser } from "./redux/slices/authSlice";
import { useGetMeQuery } from "./services/authApi";

const App = () => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const { data, isLoading, isError } = useGetMeQuery(null);
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  // useEffect(() => {
  //   // Use the `data` returned from the `getMe` endpoint method

  //   console.log("Token retrieved from sessionStorage:", user.token);
  // }, [data]);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/recruitment" element={<RecruitmentHome />}></Route>
          <Route path="/departments" element={<DepartmentPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

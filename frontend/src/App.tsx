import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RecruitmentHome from "./components/Recrutment/RecrutmentHome";
import DepartmentPage from "./components/Departments/DepartmentPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { getAuthUser, setUser } from "./redux/slices/authSlice";
import { useGetMeQuery } from "./services/authApi";
import ApplicationPage from "./components/Candidates/ApplicationPage";
import EmployeesPage from "./components/Employees/EmployeesPage";
import DepartmentEmployees from "./components/Departments/DepartmentEmployees";

const App = () => {
  const dispatch = useAppDispatch();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const { data, isLoading, isError } = useGetMeQuery(null);
  useEffect(() => {
    dispatch(setUser(user));
  }, []);
  useEffect(() => {
    if (data) {
      dispatch(getAuthUser(data));
    }
  }, [isLoading]);
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/recruitment" element={<RecruitmentHome />}></Route>
          <Route path="/departments" element={<DepartmentPage />}></Route>
          <Route path="/application/:id" element={<ApplicationPage />}></Route>
          <Route path="/employees" element={<EmployeesPage />}></Route>
          <Route
            path="/departmentEmployees"
            element={<DepartmentEmployees />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

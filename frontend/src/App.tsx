import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import RecruitmentHome from "./components/Recrutment/RecrutmentHome";
import DepartmentPage from "./components/Departments/DepartmentPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
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

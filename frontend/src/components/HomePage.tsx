import Module from "./Module";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectAuth } from "../redux/slices/authSlice";
import { toast } from "react-toastify";

const HomePage: React.FC = () => {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    dispatch(logout());
    toast.success("User logged out successfully");
    navigate("/login");
  };
  console.log(user?.department?.name);

  return (
    <div className="h-screen overflow-y-hidden">
      <div className="flex justify-center mt-8">
        <img className="h-36 w-36" src={logo} alt="logo" />
        <h1>{user?.department?.name}</h1>
      </div>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-12">
        <Link to={"/"}>
          <Module
            title="Employees"
            icon={<i className="fa-sharp fa-solid fa-user-tie"></i>}
          />
        </Link>

        <Module
          title="Contracts"
          icon={<i className="fa-sharp fa-solid fa-file-contract"></i>}
        />

        <Link to={"/recruitment"}>
          <Module
            title="Recruitment"
            icon={<i className="fa-sharp fa-solid fa-user-plus"></i>}
          />
        </Link>

        <Link to={"/departments"}>
          <Module
            title="Departments"
            icon={<i className="fa-sharp fa-solid fa-building"></i>}
          />
        </Link>

        <Module
          title="Holidays"
          icon={<i className="fa-sharp fa-solid fa-gift"></i>}
        />

        <Module
          title="Payslips"
          icon={<i className="fa-sharp fa-solid fa-cash-register"></i>}
        />
      </div>
      <div className="flex justify-end px-12">
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center p-4 border border-transparent rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <i
            className="fa-sharp fa-solid fa-right-from-bracket"
            aria-hidden="true"
          ></i>
        </button>
      </div>
    </div>
  );
};

export default HomePage;

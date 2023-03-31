import { useEffect, useState } from "react";
import IUser from "../../../Interfaces/User";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";
import API from "../../../utils/API";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useAppSelector(selectAuth);
  const [rerender, setRerender] = useState(false);
  const [inputs, setInputs] = useState<IUser>({
    fname: "",
    lname: "",
    cin: "",
    birthday: "",
    phone: "",
    email: "",
    img: null,
    department_id: 0,
    role: "EMPLOYEE",
    password: "",
  });
  const [oldPassword, setOldPassword] = useState({
    old_password: "",
  });

  useEffect(() => {
    if (user) {
      setInputs((prevState) => ({
        ...prevState,
        fname: user.fname ?? "",
        lname: user.lname ?? "",
        cin: user.cin ?? "",
        birthday: user.birthday ?? "",
        phone: user.phone ?? "",
        email: user.email ?? "",
        img: user.img as File,
        department_id: user.department_id ?? 0,
        role: user.role as "ADMIN" | "EMPLOYEE" | "CHEF",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("fname", inputs.fname);
    formData.append("lname", inputs.lname);
    formData.append("email", inputs.email);
    formData.append("birthday", inputs.birthday);
    formData.append("cin", inputs.cin);
    formData.append("phone", inputs.phone);
    formData.append("password", inputs.password);
    formData.append("old_password", oldPassword.old_password);
    formData.append("role", user?.role as string);
    formData.append("department_id", inputs.department_id?.toString() ?? "");

    await API.post(`update/${user?.id}`, formData)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Profile updated successfully");
          setRerender(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex items-center justify-center">
      <div className="xl:w-10/12 w-full px-8">
        <div className="xl:px-24">
          <div className="px-5 py-4 bg-gray-100 rounded-lg flex items-center justify-between mt-7">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9.99999H20C20.2652 9.99999 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V11C3 10.7348 3.10536 10.4804 3.29289 10.2929C3.48043 10.1054 3.73478 9.99999 4 9.99999H5V8.99999C5 8.08074 5.18106 7.17049 5.53284 6.32121C5.88463 5.47193 6.40024 4.70026 7.05025 4.05025C7.70026 3.40023 8.47194 2.88462 9.32122 2.53284C10.1705 2.18105 11.0807 1.99999 12 1.99999C12.9193 1.99999 13.8295 2.18105 14.6788 2.53284C15.5281 2.88462 16.2997 3.40023 16.9497 4.05025C17.5998 4.70026 18.1154 5.47193 18.4672 6.32121C18.8189 7.17049 19 8.08074 19 8.99999V9.99999ZM17 9.99999V8.99999C17 7.67391 16.4732 6.40214 15.5355 5.46446C14.5979 4.52678 13.3261 3.99999 12 3.99999C10.6739 3.99999 9.40215 4.52678 8.46447 5.46446C7.52678 6.40214 7 7.67391 7 8.99999V9.99999H17ZM11 14V18H13V14H11Z"
                    fill="#4B5563"
                  />
                </svg>
              </div>

              <p className="text-sm text-gray-800 pl-3">
                We take privacy issues seriously. You can be sure that your
                personal data is securely protected.
              </p>
            </div>
          </div>
          <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16">
            <div className="w-80">
              <div className="flex items-center">
                <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                  Personal Information
                </h1>
              </div>
              <p className="mt-4 text-sm leading-5 text-gray-600">
                Information about yourself you can update it anytime you want.
              </p>
            </div>
            <div>
              <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                <div className="md:w-64">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="fname"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="fname"
                    onChange={handleChange}
                    value={inputs.fname}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="firstName"
                    placeholder="John"
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="lname"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    value={inputs.lname}
                    onChange={handleChange}
                    name="lname"
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="lastName"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="md:flex items-center lg:ml-24 mt-8">
                <div className="md:w-64">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="email"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={inputs.email}
                    onChange={handleChange}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="emailAddress"
                    placeholder="youremail@example.com"
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="phone"
                  >
                    Phone number
                  </label>
                  <input
                    type="text"
                    value={inputs.phone}
                    onChange={handleChange}
                    name="phone"
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="phone"
                    placeholder="123-1234567"
                  />
                </div>
              </div>

              <div className="md:flex items-center lg:ml-24 mt-8">
                <div className="md:w-64">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="cin"
                  >
                    Cin
                  </label>
                  <input
                    type="text"
                    name="cin"
                    value={user?.cin}
                    onChange={handleChange}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="cin"
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="department_id"
                  >
                    Role
                  </label>
                  <input
                    type="department_id"
                    disabled
                    value={user?.role}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="department_id"
                    placeholder="123-1234567"
                  />
                </div>
              </div>

              <div className="md:flex items-center lg:ml-24 mt-8">
                <div className="md:w-64">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleChange}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="password"
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="md:w-64 md:ml-12 md:mt-0 mt-4">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="department_id"
                  >
                    Department
                  </label>
                  <input
                    type="department_id"
                    disabled
                    value={user?.department?.name}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="department_id"
                    placeholder="123-1234567"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 lg:flex justify-between border-b border-gray-200 pb-16 mb-4">
            <div className="w-80">
              <div className="flex items-center">
                <h1 className="text-xl font-medium pr-2 leading-5 text-gray-800">
                  Security
                </h1>
              </div>
              <p className="mt-4 text-sm leading-5 text-gray-600">
                Enter your previous password to update your profile
              </p>
            </div>
            <div>
              <div className="md:flex items-center lg:ml-24 lg:mt-0 mt-4">
                <div className="md:w-64">
                  <label
                    className="text-sm leading-none text-gray-800"
                    id="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="old_password"
                    value={oldPassword.old_password}
                    onChange={handlePasswordChange}
                    className="w-full p-3 mt-3 bg-gray-100 border rounded border-gray-200 focus:outline-none focus:border-gray-600 text-sm font-medium leading-none text-gray-800"
                    aria-labelledby="password"
                    placeholder="Enter old password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 pb-8">
            <button
              onClick={() => {
                handleSubmit();
              }}
              type="button"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

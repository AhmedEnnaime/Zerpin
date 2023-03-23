import { useState } from "react";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import ICandidate from "../../Interfaces/Candidate";
import API from "../../utils/API";

const ApplicationPage = () => {
  const [inputs, setInputs] = useState<ICandidate>({
    fname: "",
    lname: "",
    birthday: "",
    cin: "",
    phone: "",
    email: "",
    cv: "",
    img: "",
    recrutment_id: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    console.log(inputs);
    // await API.post(`candidates`, inputs)
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status === 201) {
    //       toast.success("Your application was sent successfully");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div className="bg-white py-16 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-24">
      <div className="relative max-w-xl mx-auto">
        <div className="flex justify-center text-center">
          <img src={logo} alt="" />
        </div>
        <div className="mt-12">
          <form
            action="#"
            method="POST"
            className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          >
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="fname"
                  id="first-name"
                  onChange={handleChange}
                  value={inputs.fname}
                  autoComplete="given-name"
                  placeholder="Enter First name"
                  className="py-3 px-4 block w-full border-2  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="lname"
                  id="last-name"
                  onChange={handleChange}
                  value={inputs.lname}
                  autoComplete="family-name"
                  placeholder="Enter Last name"
                  className="py-3 px-4 block border-2 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="birthday"
                className="block text-sm font-medium text-gray-700"
              >
                Birthday
              </label>
              <div className="mt-1">
                <input
                  type="date"
                  name="birthday"
                  onChange={handleChange}
                  value={inputs.birthday}
                  id="birthday"
                  autoComplete="given-name"
                  className="py-3 px-4 block w-full border-2  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                CIN
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="cin"
                  onChange={handleChange}
                  value={inputs.cin}
                  id="cin"
                  autoComplete="family-name"
                  placeholder="Enter Cin"
                  className="py-3 px-4 block border-2 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  value={inputs.email}
                  onChange={handleChange}
                  type="email"
                  autoComplete="email"
                  placeholder="Enter email"
                  className="py-3 px-4 block border-2 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="text"
                  name="phone"
                  id="phone-number"
                  value={inputs.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                  className="py-3 px-4 block w-full border-2 focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="cv"
                className="block text-sm font-medium text-gray-700"
              >
                CV
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  name="cv"
                  value={inputs.cv}
                  onChange={handleChange}
                  id="cv"
                  autoComplete="given-name"
                  className="py-3 px-4 block w-full border-2  shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <div className="mt-1">
                <input
                  type="file"
                  name="img"
                  onChange={handleChange}
                  value={inputs.img}
                  id="img"
                  autoComplete="family-name"
                  className="py-3 px-4 block border-2 w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-200 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;

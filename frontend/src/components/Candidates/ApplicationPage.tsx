import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png";
import ICandidate from "../../Interfaces/Candidate";
import API from "../../utils/API";

const ApplicationPage = () => {
  let { id } = useParams();
  const [img, setImg] = useState<File | null>(null);
  const [cv, setCv] = useState<File | null>(null);
  const navigate = useNavigate();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files && e.target.files[0]);
    if (e.target.files && e.target.files.length > 0) {
      setImg(e.target.files && e.target.files[0]);
    }
  };

  const handleCv = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files && e.target.files[0]);

    if (e.target.files && e.target.files.length > 0) {
      setCv(e.target.files && e.target.files[0]);
    }
  };

  const [inputs, setInputs] = useState<ICandidate>({
    fname: "",
    lname: "",
    birthday: "",
    cin: "",
    phone: "",
    email: "",
    cv: cv,
    img: img,
    recrutment_id: id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fname", inputs.fname);
    formData.append("lname", inputs.lname);
    formData.append("email", inputs.email);
    formData.append("birthday", inputs.birthday);
    formData.append("cin", inputs.cin);
    formData.append("phone", inputs.phone);
    formData.append("cv", cv as File);
    formData.append("img", img as File);
    formData.append("recrutment_id", inputs.recrutment_id as string);

    await API.post(`candidates`, formData)
      .then((res) => {
        console.log(res.data);
        if (res.status === 201) {
          toast.success("Your application was sent successfully");
          navigate("/success");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
                  onChange={handleCv}
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
                  onChange={handleImage}
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

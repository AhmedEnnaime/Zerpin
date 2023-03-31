import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IRecruitment from "../../../Interfaces/Recruitment";
import API from "../../../utils/API";

const Jobs = () => {
  const [jobs, setJobs] = useState<IRecruitment[]>();
  const navigate = useNavigate();
  const getJobs = async () => {
    await API.get(`recrutments`)
      .then((res) => {
        const filteredJobs = res.data.filter(
          (job: IRecruitment) => job.number > (job.candidates ?? []).length
        );
        setJobs(filteredJobs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getMonthName(month: string): string {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        return "";
    }
  }

  useEffect(() => {
    getJobs();
  }, []);
  return (
    <section
      aria-labelledby="timeline-title"
      className="lg:col-start-3 w-full lg:col-span-1"
    >
      <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
        <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
          Open Jobs
        </h2>

        {/* Activity Feed */}
        <div className="mt-6 flow-root">
          <ul role="list" className="-mb-8">
            {jobs ? (
              jobs.map((job) => (
                <li key={job.id}>
                  <div className="relative pb-8">
                    <div className="relative flex space-x-3">
                      <div></div>
                      <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                        <div>
                          <p className="text-sm text-gray-500">
                            <a href="#" className="font-medium text-gray-900">
                              {job.position}
                            </a>
                          </p>
                        </div>
                        <div className="text-right text-sm whitespace-nowrap text-gray-500">
                          <time dateTime={job.created_at?.split("T")[0]}>
                            {getMonthName(
                              job.created_at
                                ?.split("T")[0]
                                .split("-")[1] as string
                            )}{" "}
                            {job.created_at?.split("T")[0].split("-")[2]}{" "}
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <h1>All jobs are closed</h1>
            )}
          </ul>
        </div>
        <div className="mt-6 flex flex-col justify-stretch">
          <button
            onClick={() => {
              navigate("/recruitment");
            }}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View All Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Jobs;

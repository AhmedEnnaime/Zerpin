import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";

const MyContract = () => {
  const { user } = useAppSelector(selectAuth);
  return (
    <div className="bg-white w-full px-4 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Contract Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Personal details about your contract.
        </p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Full name</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.fname} {user?.lname}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Position</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.contract?.position}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Base Salary</dt>
            <dd className="mt-1 text-sm text-gray-900">
              ${user?.contract?.base_salary}
            </dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Final Salary</dt>
            <dd className="mt-1 text-sm text-gray-900">
              ${user?.contract?.final_salary}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Debut date</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.contract?.debut_date.split("T")[0]}
            </dd>
          </div>

          {user?.contract?.final_date ? (
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Final date</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {user?.contract?.final_date.split("T")[0]}
              </dd>
            </div>
          ) : (
            ""
          )}
          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">State</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.contract?.state}
            </dd>
          </div>

          <div className="sm:col-span-1">
            <dt className="text-sm font-medium text-gray-500">Hired date</dt>
            <dd className="mt-1 text-sm text-gray-900">
              {user?.created_at?.split("T")[0]}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default MyContract;

const RecruitmentCard: React.FC = () => {
  return (
    <div className="flex items-center w-full justify-center py-8">
      <div className="max-w-sm rounded shadow bg-blue-200">
        <div className="flex">
          <div className="px-6 py-5">
            <p className="text-base font-medium leading-none text-gray-800">
              Devops Recruitment
            </p>
            <p className="text-xs leading-3 text-gray-800 pt-2">
              Devops engineer
            </p>
            <p className="text-xl font-semibold leading-tight text-gray-800 pt-6">
              2 Places
            </p>
            <div className="pt-4">
              <button className="py-2 px-4 text-xs font-semibold leading-3 bg-blue-400 rounded hover:bg-blue-500 focus:outline-none">
                View Candidates
              </button>
            </div>
          </div>
          <div className="px-3">
            <img src="https://i.ibb.co/34gPtCT/bg.png" alt="medal" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitmentCard;

import Module from "./Module";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen">
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-32">
        <Module
          title="Employees"
          icon={<i className="fa-sharp fa-solid fa-user-tie"></i>}
        />

        <Module
          title="Contracts"
          icon={<i className="fa-sharp fa-solid fa-file-contract"></i>}
        />

        <Module
          title="Recrutment"
          icon={<i className="fa-sharp fa-solid fa-user-plus"></i>}
        />

        <Module
          title="Departments"
          icon={<i className="fa-sharp fa-solid fa-building"></i>}
        />

        <Module
          title="Holidays"
          icon={<i className="fa-sharp fa-solid fa-gift"></i>}
        />

        <Module
          title="Payslips"
          icon={<i className="fa-sharp fa-solid fa-cash-register"></i>}
        />
      </div>
      <div className="mt-24 flex justify-end px-12">
        <button
          type="button"
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

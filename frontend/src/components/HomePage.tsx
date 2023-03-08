import Module from "./Module";

const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-4xl text-red-600">Docker is awesome</h1>
      <Module
        title="Employees"
        icon={<i className="fa-sharp fa-solid fa-user-tie"></i>}
      />
    </div>
  );
};

export default HomePage;

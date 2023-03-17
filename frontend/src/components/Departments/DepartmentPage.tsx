import Navbar from "../Navbar";
import Card from "./Card";

const DepartmentPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-12">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </>
  );
};
export default DepartmentPage;

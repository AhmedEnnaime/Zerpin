import IDepartment from "./Department";
import IContract from "./Contract";

interface IUser {
  id?: number;
  fname: string;
  lname: string;
  birthday: string;
  cin: string;
  phone: string;
  email: string;
  password: string;
  img: string;
  role: "ADMIN" | "CHEF" | "EMPLOYEE";
  department_id: number;
  created_at?: string;
  updated_at?: string;
  department?: IDepartment;
  contract?: IContract;
}

export default IUser;

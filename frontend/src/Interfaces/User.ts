import IDepartment from "./Department";
import IContract from "./Contract";
import IHoliday from "./Holiday";

interface IUser {
  id?: number;
  fname: string;
  lname: string;
  birthday: string;
  cin: string;
  phone: string;
  email: string;
  password: string;
  img: File | null;
  role: "ADMIN" | "CHEF" | "EMPLOYEE";
  department_id: number | null;
  created_at?: string;
  updated_at?: string;
  department?: IDepartment | null;
  contract?: IContract | null;
  holidays?: IHoliday[] | null;
}

export default IUser;

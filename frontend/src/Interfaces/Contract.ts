import IUser from "./User";
import IRule from "./Rule";

interface IContract {
  id?: number;
  ref: string;
  position: string;
  debut_date: string;
  final_date: string | null;
  base_salary: number;
  final_salary: number;
  user_id: number;
  state: "ONGOING" | "EXPIRED";
  created_at?: string;
  updated_at?: string;
  user?: IUser;
  rules?: IRule[];
}

export default IContract;

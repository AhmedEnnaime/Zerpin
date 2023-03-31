import IUser from "./User";

interface IHoliday {
  id?: number;
  debut_date: string;
  final_date: string;
  user_id: number;
  state: "WAITING" | "REJECTED" | "VALIDATED";
  created_at?: string;
  updated_at?: string;
  user?: IUser;
}

export default IHoliday;

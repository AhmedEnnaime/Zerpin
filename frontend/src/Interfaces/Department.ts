import IUser from "./User";

interface IDepartment {
  id?: number;
  name: string;
  description: string;
  created_at?: string;
  updated_at?: string;
  users?: IUser[];
}

export default IDepartment;

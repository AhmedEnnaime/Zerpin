import { RecruitmentStatus } from "../PropsTypes";
import IRecruitment from "./Recruitment";

interface ICandidate {
  id?: number;
  fname: string;
  lname: string;
  birthday: string;
  cin: string;
  phone: string;
  email: string;
  cv: string;
  img: string;
  recrutment_id: string | undefined;
  recrutment_state?: RecruitmentStatus;
  recrutment?: IRecruitment;
  created_at?: string;
  updated_at?: string;
}

export default ICandidate;

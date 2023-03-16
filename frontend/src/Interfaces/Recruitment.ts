import ICandidate from "./Candidate";

interface IRecruitment {
  id?: number;
  title: string;
  position: string;
  number: number;
  description: string;
  user_id?: number;
  department_id: number;
  created_at?: string;
  updated_at?: string;
  candidates: ICandidate[];
}
export default IRecruitment;

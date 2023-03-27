import IContract from "./Contract";

interface IPayslip {
  id?: number;
  ref: string;
  contract_id: number;
  created_at?: string;
  updated_at?: string;
  contract?: IContract;
}

export default IPayslip;

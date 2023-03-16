interface IRule {
  id?: number;
  name: string;
  rule_type: string;
  rate: number;
  created_at?: string;
  updated_at?: string;
}

export default IRule;

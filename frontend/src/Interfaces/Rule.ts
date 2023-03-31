interface IRule {
  type: string;
  id?: number;
  name: string;
  rule_type: "AUGMENTATION" | "DISCOUNT";
  rate: number;
  created_at?: string;
  updated_at?: string;
}

export default IRule;

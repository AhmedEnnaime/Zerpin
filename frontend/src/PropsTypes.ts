import IDepartment from "./Interfaces/Department";

export type ModuleProps = {
  title: string;
  icon: JSX.Element;
};

export type RecruitmentModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DepartmentModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DepartmentCardProps = {
  department: IDepartment;
};

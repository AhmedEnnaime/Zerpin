import IDepartment from "./Interfaces/Department";
import IRecruitment from "./Interfaces/Recruitment";
import IUser from "./Interfaces/User";

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

export type RecruitmentCardProps = {
  recruitment: IRecruitment;
};

export type EmployeeCardProps = {
  employee: IUser;
};

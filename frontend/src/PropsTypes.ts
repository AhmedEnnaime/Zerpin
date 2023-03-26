import ICandidate from "./Interfaces/Candidate";
import IContract from "./Interfaces/Contract";
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

export type ContractCardProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  contract: IContract;
  setContract?: React.Dispatch<React.SetStateAction<IContract>>;
};

export type RecruitmentStatus = "EVALUATION" | "INTERVIEW" | "NEGOTIATIONS";

export type ContainerCardsProps = {
  status: RecruitmentStatus;
  items: ICandidate[];
  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: number, status: RecruitmentStatus) => void;
};

export type CandidateCardProps = {
  candidate: ICandidate;
  handleDragging: (dragging: boolean) => void;
};

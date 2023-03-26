import { ContainerCardsProps, RecruitmentStatus } from "../../PropsTypes";
import CandidateCard from "./CandidateCard";

const ContainerCards = ({
  items,
  status,
  isDragging,
  handleDragging,
  handleUpdateList,
}: ContainerCardsProps) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("text");
    handleUpdateList(id, status);
    handleDragging(false);
  };
  return (
    <div
      className={`flex justify-around w-full h-fit py-4 border-2 border-gray-700 rounded-md  ${
        isDragging
          ? "flex justify-around w-full h-fit py-4 border-2 border-gray-700 rounded-md bg-red-400"
          : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col gap-y-4 items-center">
        <p>{status}</p>
        {items
          ? items?.map(
              (candidate) =>
                status === candidate.recrutment_state && (
                  <CandidateCard
                    handleDragging={handleDragging}
                    candidate={candidate}
                    key={candidate.id}
                  />
                )
            )
          : ""}
      </div>
    </div>
  );
};

export default ContainerCards;

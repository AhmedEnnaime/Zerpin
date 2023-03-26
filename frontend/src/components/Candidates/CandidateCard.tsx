import { CandidateCardProps } from "../../PropsTypes";

const CandidateCard = ({ candidate, handleDragging }: CandidateCardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", `${candidate.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);
  return (
    <div
      className="bg-blue-300 w-full cursor-pointer"
      draggable
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <p>
        {candidate.fname} {candidate.lname}
      </p>
    </div>
  );
};

export default CandidateCard;

import { useState } from "react";
import { CandidateCardProps } from "../../PropsTypes";
import SignContract from "../Contracts/SignContract";

const CandidateCard = ({ candidate, handleDragging }: CandidateCardProps) => {
  const [open, setOpen] = useState(false);
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
      {candidate.recrutment_state == "NEGOTIATIONS" ? (
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          Sign Contract
        </button>
      ) : (
        ""
      )}
      {open ? (
        <SignContract open={open} setOpen={setOpen} candidate={candidate} />
      ) : (
        ""
      )}
    </div>
  );
};

export default CandidateCard;

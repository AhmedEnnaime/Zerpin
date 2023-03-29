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
    <div className="flex w-full cursor-pointer items-center dark:bg-gray-900 py-12 px-6 justify-center">
      <div>
        <div
          draggable
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          className="w-72 h-fit gap-y-4 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
        >
          <div className="flex items-center gap-x-6 pb-6">
            <img
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              className="h-12 w-12 rounded-full"
              alt=""
            />
            <p className="text-gray-800 dark:text-gray-100 text-xl">
              {candidate.fname} {candidate.lname}
            </p>
          </div>
          <hr />
          <div>
            <div className="flex items-center justify-between text-gray-800">
              <p className="text-sm dark:text-gray-100">March 28, 2020</p>
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-pencil"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                  <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div
    //   className="bg-blue-300 w-full cursor-pointer"
    //   draggable
    //   onDragEnd={handleDragEnd}
    //   onDragStart={handleDragStart}
    // >
    //   <p>
    //     {candidate.fname} {candidate.lname}
    //   </p>
    //   {candidate.recrutment_state == "NEGOTIATIONS" ? (
    //     <button
    //       onClick={() => {
    //         setOpen(true);
    //       }}
    //     >
    //       Sign Contract
    //     </button>
    //   ) : (
    //     ""
    //   )}
    //   {open ? (
    //     <SignContract open={open} setOpen={setOpen} candidate={candidate} />
    //   ) : (
    //     ""
    //   )}
    // </div>
  );
};

export default CandidateCard;

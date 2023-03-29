import { Button } from "flowbite-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { CandidateCardProps } from "../../PropsTypes";
import API from "../../utils/API";
import SignContract from "../Contracts/SignContract";
import CandidateInfo from "./CandidateInfo";

const CandidateCard = ({ candidate, handleDragging }: CandidateCardProps) => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", `${candidate.id}`);
    handleDragging(true);
  };
  const handleDragEnd = () => handleDragging(false);

  const rejectCandidate = async (id: number) => {
    await API.delete(`candidates/${id}`)
      .then((res) => {
        if (res.status === 202) {
          toast.success("Candidate rejected successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex w-full cursor-pointer items-center dark:bg-gray-900 py-2 px-6 justify-center">
      <div>
        <div
          draggable
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          className="w-72 h-fit gap-y-4 flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg border border-gray-400 mb-6 py-5 px-4"
        >
          <div className="flex flex-col gap-y-8 pb-2">
            <div className="flex items-center gap-x-2">
              <img
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                className="h-12 w-12 rounded-full"
                alt=""
              />
              <p className="text-gray-800 dark:text-gray-100 text-xl">
                {candidate.fname} {candidate.lname}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <Button
                onClick={() => {
                  setView(true);
                }}
                size={"xs"}
                pill={true}
              >
                View
              </Button>

              <Button
                onClick={() => {
                  rejectCandidate(candidate.id as number);
                }}
                color="failure"
                size={"xs"}
                pill={true}
              >
                Reject
              </Button>
            </div>
          </div>
          <hr />
          <div>
            <div className="flex items-center justify-between text-gray-800">
              <p className="text-sm dark:text-gray-100">
                {candidate.created_at?.split("T")[0]}
              </p>
              {candidate.recrutment_state === "NEGOTIATIONS" ? (
                <div className="w-4 h-4 bg-green-600 rounded-full p-4 text-white flex items-center justify-center">
                  <i
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="fa-sharp fa-solid fa-file-signature"
                  ></i>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {open ? (
        <SignContract open={open} setOpen={setOpen} candidate={candidate} />
      ) : (
        ""
      )}
      {view ? (
        <CandidateInfo open={view} setOpen={setView} candidate={candidate} />
      ) : (
        ""
      )}
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

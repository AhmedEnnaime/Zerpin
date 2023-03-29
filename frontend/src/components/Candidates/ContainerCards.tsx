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

  const filteredItems = items?.filter(
    (item) => item.recrutment_state === status
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const id = +e.dataTransfer.getData("text");
    handleUpdateList(id, status);
    handleDragging(false);
  };
  return (
    <div
      className={`flex justify-around w-full h-fit py-4 border-gray-700 rounded-md  ${
        isDragging ? "flex justify-around w-full h-fit py-4" : ""
      }`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col gap-y-4 items-center">
        <div>
          <dl className="mt-5">
            <div
              className={`flex gap-x-28 border-t-4 ${
                status === "EVALUATION"
                  ? "border-green-600"
                  : status === "INTERVIEW"
                  ? "border-purple-600"
                  : status === "NEGOTIATIONS"
                  ? "border-yellow-400"
                  : "border-gray-700"
              } items-center justify-between px-2 py-3 bg-white shadow rounded-lg overflow-hidden`}
            >
              <dd className="mt-1 text-xl font-semibold text-gray-900">
                {status}
              </dd>
              <div className="p-1 px-3 bg-gray-300 rounded-md">
                {filteredItems.length}
              </div>
            </div>
          </dl>
        </div>
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

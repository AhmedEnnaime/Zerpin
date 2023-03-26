import { useState } from "react";
import { toast } from "react-toastify";
import ICandidate from "../../Interfaces/Candidate";
import { RecruitmentStatus } from "../../PropsTypes";
import { useAppSelector } from "../../redux/hooks";
import { selectRecruitment } from "../../redux/slices/recruitmentSlice";
import API from "../../utils/API";
import ContainerCards from "./ContainerCards";

const typesRecruitmentState: RecruitmentStatus[] = [
  "EVALUATION",
  "INTERVIEW",
  "NEGOTIATIONS",
];
const DragAndDrop = () => {
  const { recruitment } = useAppSelector(selectRecruitment);
  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState<ICandidate[]>(
    recruitment?.candidates as ICandidate[]
  );

  const handleDragging = (dragging: boolean) => setIsDragging(dragging);
  const handleUpdateList = async (id: number, status: RecruitmentStatus) => {
    let card = listItems.find((item) => item.id === id);

    if (card && card.recrutment_state !== status) {
      const formData = new FormData();
      formData.append("recrutment_state", status);
      await API.post(`updateState/${id}`, formData)
        .then((res) => {
          console.log(res.data);
          console.log(status);
          if (res.status === 200) {
            setListItems((prev) => [
              card!,
              ...prev.filter((item) => item.id !== id),
            ]);
            toast.success(`Candidate passed successfully to ${status}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center pt-12 px-4">
      {typesRecruitmentState.map((container) => (
        <ContainerCards
          items={listItems}
          status={container}
          key={container}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};

export default DragAndDrop;

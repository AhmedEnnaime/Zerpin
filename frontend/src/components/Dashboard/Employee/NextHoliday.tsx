import { Timeline } from "flowbite-react";
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../../redux/slices/authSlice";

const NextHoliday = () => {
  const { user } = useAppSelector(selectAuth);

  function getMonthName(month: string): string {
    switch (month) {
      case "01":
        return "January";
      case "02":
        return "February";
      case "03":
        return "March";
      case "04":
        return "April";
      case "05":
        return "May";
      case "06":
        return "June";
      case "07":
        return "July";
      case "08":
        return "August";
      case "09":
        return "September";
      case "10":
        return "October";
      case "11":
        return "November";
      case "12":
        return "December";
      default:
        return "";
    }
  }
  return (
    <Timeline>
      {user?.holidays ? (
        user.holidays.map((holiday) => (
          <Timeline.Item>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>
                {holiday.created_at?.split("T")[0].split("-")[2]}{" "}
                {getMonthName(
                  holiday.created_at?.split("T")[0].split("-")[1] as string
                )}{" "}
                {holiday.created_at?.split("T")[0].split("-")[0]}{" "}
              </Timeline.Time>
              <Timeline.Title>
                Taken From {holiday.debut_date?.split("T")[0].split("-")[2]}{" "}
                {getMonthName(
                  holiday.debut_date?.split("T")[0].split("-")[1] as string
                )}{" "}
                {holiday.debut_date?.split("T")[0].split("-")[0]}
              </Timeline.Title>
              <Timeline.Title>
                To {holiday.final_date?.split("T")[0].split("-")[2]}{" "}
                {getMonthName(
                  holiday.final_date?.split("T")[0].split("-")[1] as string
                )}{" "}
                {holiday.final_date?.split("T")[0].split("-")[0]}{" "}
              </Timeline.Title>
            </Timeline.Content>
          </Timeline.Item>
        ))
      ) : (
        <h1>You haven't picked a holiday yet</h1>
      )}
    </Timeline>
  );
};

export default NextHoliday;

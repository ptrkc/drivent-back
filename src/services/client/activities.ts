import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import Activitie from "@/entities/Activitie";

export async function getActivities() {
  const data = await Activitie.get();
  
  const convertTimestampToTime = (timestamp: string) => { 
    const time = dayjs(timestamp).format("HH:mm");
    return time;
  };
  
  const convertTimestampToDate = (timestamp: string) => { 
    const date = dayjs(timestamp).locale("pt-br").format("dddd, DD/MM");
    return date.replace("-feira", "");
  };  

  const activities = data.map(activitie => {
    const calculateVacancies = activitie.vacancies - activitie.users.length;

    return {
      ...activitie,
      startTime: convertTimestampToTime(activitie.startTime),
      endTime: convertTimestampToTime(activitie.endTime),
      date: convertTimestampToDate(activitie.startTime),
      auditorium: activitie.auditorium.name,
      vacancies: calculateVacancies,
    };
  });
  
  return activities;
}

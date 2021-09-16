import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import User from "@/entities/User";
import Activitie from "@/entities/Activitie";
import { ActivitieEnrollment } from "@/interfaces/activitieEnrollment";
import UserAlreadyEnrolledError from "@/errors/UserAlreadyEnrolled";

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

export async function enrollUser(enrollmentData: ActivitieEnrollment) {
  const { userId, activitieId } = enrollmentData;

  const user = await User.findById(userId);
  console.log(user);
  if(!user) return null;

  const activitie = await Activitie.findById(activitieId);

  if(!activitie) return null;
  
  if(activitie.users.find(u => u.id === user.id)) {
    throw new UserAlreadyEnrolledError();
  }
 
  activitie.users = [user];
  await Activitie.save(activitie);

  return true;
}

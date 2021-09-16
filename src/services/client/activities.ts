import dayjs from "dayjs";
import "dayjs/locale/pt-br";

import User from "@/entities/User";
import Activitie from "@/entities/Activitie";
import { ActivitieEnrollment } from "@/interfaces/activitieEnrollment";
import UserAlreadyEnrolledError from "@/errors/UserAlreadyEnrolled";
import TimeConflictError from "@/errors/TimeConflict";

export async function getActivities() {
  const data = await Activitie.get();

  const activities = formatActivities(data);
  
  return activities;
}

export async function enrollUser(enrollmentData: ActivitieEnrollment) {
  const { userId, activitieId } = enrollmentData;

  const user = await User.findById(userId);

  if(!user) return null;

  const activitie = await Activitie.findById(activitieId);

  if(!activitie) return null;

  const userActivities = formatUserActivities(user);
  
  if(activitie.users.find(u => u.id === user.id)) {
    throw new UserAlreadyEnrolledError();
  }

  let timeConflict = false;

  userActivities.forEach(userActivitie => {
    const activitieDate = convertTimestampToDate(activitie.startTime);
    const activitieStartTime = convertTimestampToTime(activitie.startTime);
    if(userActivitie.date === activitieDate) {
      if (userActivitie.endTime > activitieStartTime) timeConflict = true;
    }
  });

  if(timeConflict) {
    throw new TimeConflictError;
  }

  activitie.users = [user];
  await Activitie.save(activitie);

  return true;
}

function formatActivities(activitieData: Activitie[]) {
  const activities = activitieData.map(activitie => {
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

function formatUserActivities(userActivitiesData: User) {
  const userActivities = userActivitiesData.activities.map(activitie => {
    return {
      ...activitie,
      startTime: convertTimestampToTime(activitie.startTime),
      endTime: convertTimestampToTime(activitie.endTime),
      date: convertTimestampToDate(activitie.startTime),
    };
  });

  return userActivities;
}

const convertTimestampToTime = (timestamp: string) => { 
  const time = dayjs(timestamp).format("HH:mm");
  return time;
};

const convertTimestampToDate = (timestamp: string) => { 
  const date = dayjs(timestamp).locale("pt-br").format("dddd, DD/MM");
  return date.replace("-feira", "");
};  

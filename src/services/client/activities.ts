import Activitie from "@/entities/Activitie";

export async function getActivities() {
  return await Activitie.get();
}

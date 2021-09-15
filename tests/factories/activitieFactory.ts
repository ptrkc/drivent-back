import Activitie from "../../src/entities/Activitie";
import * as Auditorium from "./auditoriumFactory";

export async function create() {
  const auditorium = await Auditorium.create();

  const activitie = Activitie.create({
    name: "Test Activitie",
    startTime: "2021-06-11 09:00:00",
    endTime: "2021-06-11 10:00:00",
    vacancies: 30,
    auditorium,
  });

  await activitie.save();
}

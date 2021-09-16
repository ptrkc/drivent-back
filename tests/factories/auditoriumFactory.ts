import Auditorium from "../../src/entities/Auditorium";

export async function create() {
  const auditorium = Auditorium.create({ name: "Test Auditorium" });

  await auditorium.save();

  return auditorium;
}

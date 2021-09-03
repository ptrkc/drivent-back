import Accommodation from "@/entities/Accommodation";
import Ticket from "@/entities/Ticket";

export async function getTicketsInfo() {
  return await Ticket.get();
}

export async function getAccommodationsInfo() {
  return await Accommodation.get();
}

import Ticket from "@/entities/Ticket";

export async function getTicketsInfo() {
  return await Ticket.get();
}

import faker from "faker";

import Ticket from "@/entities/Ticket";

export async function createTicket() {
  const ticket = Ticket.create({
    name: faker.random.word(),
    price: 100
  });
  
  await ticket.save();
  
  return ticket;
}

import faker from "faker";

import Accommodation from "@/entities/Accommodation";

export async function createAccommodation() {
  const accommodation = Accommodation.create({
    name: "Sem Hotel",
    price: 0
  });

  await accommodation.save();
}

import Ticket from "@/entities/Ticket";

export async function createTicket() {
  const ticket = Ticket.create({
    name: faker.random.word(),
    price: 100
  });
  
  await ticket.save();
  
  return ticket;
}

import supertest from "supertest";

import app, { init } from "@/app";
import { endConnection } from "../utils/database";
import { createTicket } from "../factories/ticketFactory";

const agent =  supertest(app);

beforeAll(async () => {
  await init();
});

afterAll(async () => {
  await endConnection();
});

describe("GET /tickets", () => {
  it("should return tickets data", async () => {
    await createTicket();
    const response = await agent.get("/tickets");
    expect(response.body).toEqual(
      expect.arrayContaining([{
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number)
      }])
    );
  });
});

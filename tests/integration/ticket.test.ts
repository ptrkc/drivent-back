import supertest from "supertest";

import app, { init } from "@/app";

import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createAccommodation } from "../factories/ticketFactory";

const agent =  supertest(app);
let settings = null;

import { createTicket } from "../factories/ticketFactory";

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  settings = await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /tickets/accommodation", () => {
  it("should return accommodation options", async () => {
    await createAccommodation();

    const response = await agent.get("/tickets/accommodation");

    expect(response.body).toEqual([
      expect.objectContaining({
        name: "Sem Hotel",
        price: 0
      })
    ]);
  });
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

import supertest from "supertest";

import app, { init } from "@/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createAccommodation } from "../factories/ticketFactory";

const agent =  supertest(app);
let settings = null;

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

import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createSession } from "../factories/sessionFactory";
import * as Activitie from "../factories/activitieFactory";

const agent = supertest(app);
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

describe("GET /activities", () => {
  beforeEach(async () => {
    await Activitie.create();
  });

  it("should return an array of activities", async () => {
    const session = await createSession();

    const response = await agent.get("/activities").set("Authorization", session.token);

    expect(response.body).toEqual([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        startTime: expect.any(String),
        endTime: expect.any(String),
        vacancies: expect.any(Number),
        auditorium: expect.any(String),
        users: expect.any(Array),
        date: expect.any(String),
      })]);
  });
});

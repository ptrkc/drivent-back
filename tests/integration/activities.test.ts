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

describe("POST /activities", () => {
  it("should returns bad request for non existing user", async () => {
    const session = await createSession();
    const activitie = await Activitie.create();
    const body = { userId: 9999, activitieId: activitie.id };

    const response = await agent.post("/activities").set("Authorization", session.token).send(body);

    expect(response.status).toEqual(400);
  });

  it("should returns bad request for non existing activitie", async () => {
    const session = await createSession();
    const body = { userId: session.userId, activitieId: 9999 };

    const response = await agent.post("/activities").set("Authorization", session.token).send(body);

    expect(response.status).toEqual(400);
  });

  it("should returns a conflict error if user is already enrolled in the activitie", async () => {
    const session = await createSession();
    const activitie = await Activitie.create();
    const body = { userId: session.userId, activitieId: activitie.id };

    const firstResponse = await agent.post("/activities").set("Authorization", session.token).send(body);

    expect(firstResponse.status).toEqual(201);

    const secondResponse = await agent.post("/activities").set("Authorization", session.token).send(body);

    expect(secondResponse.status).toEqual(409);
  });

  it("should returns a conflict error if user is already enrolled in an activitie at the same time", async () => {
    const session = await createSession();
    const firstActivitie = await Activitie.create();
    const secondActivitie = await Activitie.create();
    const firstBody = { userId: session.userId, activitieId: firstActivitie.id };
    const secondBody = { userId: session.userId, activitieId: secondActivitie.id };

    const firstResponse = await agent.post("/activities").set("Authorization", session.token).send(firstBody);

    expect(firstResponse.status).toEqual(201);

    const secondResponse = await agent.post("/activities").set("Authorization", session.token).send(secondBody);

    expect(secondResponse.status).toEqual(409);
  });
});

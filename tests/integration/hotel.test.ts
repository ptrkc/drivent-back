import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createSession } from "../factories/sessionFactory";
import * as Hotel from "../factories/hotelFactory";

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

describe("GET /hotel/:id/rooms", () => {
  beforeEach(async () => {
    await Hotel.create();
    await Hotel.createRoomType();
  });

  it("should return all hotel`s rooms", async () => {
    const session = await createSession();
    await Hotel.createHotelRoom();

    const response = await agent.get("/hotel/1/rooms").set("Authorization", session.token);

    expect(response.body).toEqual([
      expect.objectContaining({
        number: "00",
        hotelId: 1,
        roomTypeId: 1,
        filledVacancies: 1,
        isAvailable: false,
        vacancies: [
          {
            isFilled: true
          }
        ]
      })]);
  });
});

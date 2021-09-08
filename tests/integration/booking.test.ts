import supertest from "supertest";

import app, { init } from "@/app";

import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { logUserWithToken } from "../factories/userFactory";
import { createBook, saveBook } from "../factories/bookingFactory";

const agent =  supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /booking", () => {
  it("should return user`s booking details", async () => {
    const auth = await logUserWithToken();
    
    await saveBook(auth.userId);

    const response = await agent.get("/booking").set("Authorization", auth.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        isOnline: true,
        hasHotel: false,
        price: 100,
        isPaid: false,
        userId: 1
      }));
  });
});

describe("POST /booking", () => {
  it("should return status 201 for booking successfuly created", async () => {
    const auth = await logUserWithToken();
    const book = await createBook();

    const response = await agent.post("/booking").send(book).set("Authorization", auth.token);

    expect(response.status).toEqual(201);
  });

  it("should return status 422 for unprocessable booking params", async () => {
    const auth = await logUserWithToken();

    const response = await agent.post("/booking").send({}).set("Authorization", auth.token);

    expect(response.status).toEqual(422);
  });
});


import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createSession } from "../factories/sessionFactory";
import { createCreditCard } from "../factories/creditCardFactory";
import { createBooking, saveBooking } from "../factories/bookingFactory";

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

describe("GET /booking", () => {
  it("should return user`s booking details", async () => {
    const session = await createSession();
    const booking = await createBooking(session.userId);
    await saveBooking(booking);
    
    const response = await agent.get("/booking").set("Authorization", session.token);

    expect(response.body).toEqual(
      expect.objectContaining({
        isOnline: false,
        hasHotel: true,
        price: 25000
      }));
  });
});

describe("POST /booking", () => {
  it("should return status 201 for booking successfuly created", async () => {
    const session = await createSession();
    const { id, userId, isPaid, ...bookingPostParams } = await createBooking(session.userId);

    const response = await agent.post("/booking").send(bookingPostParams).set("Authorization", `Bearer ${session.token}`);

    expect(response.status).toEqual(201);
  });

  it("should return status 422 for unprocessable booking params", async () => {
    const session = await createSession();

    const response = await agent.post("/booking").send({}).set("Authorization", session.token);

    expect(response.status).toEqual(422);
  });
});

describe("POST /booking/:id/pay", () => {
  it("should return status 404 for inexistent booking id", async () => {
    const session = await createSession();
    const creditCard = createCreditCard();
    const response = await agent
      .post("/booking/999999/pay")
      .send(creditCard)
      .set({ "Authorization": `Bearer ${session.token}` });

    expect(response.status).toBe(404);
  });

  it("should return status 200 for valid booking id", async () => {
    const session = await createSession();
    const creditCard = createCreditCard();
    const booking = await createBooking(session.userId);
    await saveBooking(booking);

    const response = await agent
      .post(`/booking/${booking.id}/pay`)
      .send(creditCard)
      .set({ "Authorization": `Bearer ${session.token}` });

    expect(response.status).toBe(200);
  });
});

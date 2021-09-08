import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createSession } from "../factories/sessionFactory";
import { createCreditCard } from "../factories/creditCardFactory";
import { createBooking } from "../factories/bookingFactory";

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

describe("POST /booking/:id/pay", () => {
  it("should return status 404 for inexistent booking id", async () => {
    const session = await createSession();
    const creditCard = createCreditCard();
    const response = await agent
      .post("/booking/999999/pay")
      .send(creditCard)
      .set({ 'Authorization': `Bearer ${session.token}` });

    expect(response.status).toBe(404);
  });

  it("should return status 200 for valid booking id", async () => {
    const session = await createSession();
    const creditCard = createCreditCard();
    const booking = await createBooking();
    const response = await agent
      .post(`/booking/${booking.id}/pay`)
      .send(creditCard)
      .set({ 'Authorization': `Bearer ${session.token}` });

    expect(response.status).toBe(200);
  });
});

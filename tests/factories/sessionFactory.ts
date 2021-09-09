import { createUser } from "./userFactory";
import Session from "../../src/entities/Session";
import jwt from "jsonwebtoken";

export const createSession = async () => {
  const user = await createUser();
  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET);

  const session = Session.create({
    userId: user.id,
    token
  });

  await session.save();

  return session;
};

import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { vandorPayload } from "../dto";
import { customerPayload } from "../dto/customer.dto";

export const genHash = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const passCheck = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const genToken = async (payload: vandorPayload | customerPayload) => {
  return jsonwebtoken.sign(payload, "seckey");
};

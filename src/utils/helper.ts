import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateToken = (
  userId: string,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign({ id: userId }, secret, { expiresIn });
};

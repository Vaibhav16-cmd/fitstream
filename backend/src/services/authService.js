import bcrypt from "bcryptjs";

export const hashPassword = (password) => bcrypt.hash(password, 10);

export const comparePasswords = (password, hashedPassword) =>
  bcrypt.compare(password, hashedPassword);

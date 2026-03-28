import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";

// SIGNUP
export const signupService = async ({ email, password, organizationName }) => {
  // 1. Check if user exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // 2. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Create organization
  const org = await prisma.organization.create({
    data: {
      name: organizationName,
    },
  });

  // 4. Create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      organizationId: org.id,
    },
  });

  return { message: "Signup successful" };
};

// LOGIN
export const loginService = async ({ email, password }) => {
  // 1. Find user
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 2. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 3. Generate JWT
  const token = jwt.sign(
    {
      userId: user.id,
      organizationId: user.organizationId,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};
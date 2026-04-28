import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail, createUser } from '../repositories/authRepository.js';

export const signupUser = async ({ username, email, password, role }) => {
  if (!username || !email || !password) {
    const error = new Error('Username, email, and password are required.');
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error('Email is already in use.');
    error.statusCode = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const safeRole = role === 'ADMIN' ? 'ADMIN' : 'USER';

  return createUser({
    username,
    email,
    passwordHash,
    role: safeRole,
  });
};

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error('Email and password are required.');
    error.statusCode = 400;
    throw error;
  }

  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { token };
};
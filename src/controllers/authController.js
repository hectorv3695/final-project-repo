import { signupUser, loginUser } from '../services/authService.js';

export const signup = async (req, res, next) => {
  try {
    const user = await signupUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const result = await loginUser(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
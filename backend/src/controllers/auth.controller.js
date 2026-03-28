import { signupService, loginService } from "../services/auth.service.js";

// SIGNUP
export const signup = async (req, res) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const result = await loginService(req.body);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { loginUser } from "../services/user.service";

export function login(req: Request, res: Response) {
  const { email, role } = req.body;

  if (!email || !role) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  const user = loginUser(email, role);
  const token = jwt.sign(user, process.env.JWT_SECRET!, {
    expiresIn: "1d"
  });

  res.json({ token, user });
}

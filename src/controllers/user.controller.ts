import { Request, Response } from "express";
import userModel, { createUser } from "../models/user.model";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const newUser = await createUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
    return;
  } catch (error) {
    console.error("Error in signUp:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Server error",
    });
    return;
  }
};

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log("req.body", req.body);

    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });

      return;
    }

    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      res.status(401).json({ success: false, message: "Invalid Credentials" });
      return;
    }

    const jwtToken = jwt.sign({ id: user._id }, env.JWT_SECRET);

    res.cookie("token", jwtToken);

    res.json({
      success: true,
      message: "Sign-in successful",
      token: jwtToken,
    });
    return;
  } catch (error) {
    console.error("Error in signIn:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
    return;
  }
};

export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.json({
    success: true,
    message: "User updated successfully",
  });
  return;
};

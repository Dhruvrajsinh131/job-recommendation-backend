import { Router } from "express";
import { signIn, signUp, updateUser } from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.post("/signin", signIn);
userRoutes.post("/signup", signUp);
userRoutes.patch("/updateuser", updateUser);

export default userRoutes;

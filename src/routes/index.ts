import { Router } from "express";
import userRoutes from "./user.route";

const routerFactory = Router();

routerFactory.use("/user", userRoutes);

export default routerFactory;

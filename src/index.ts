import express, { Request, Response } from "express";
import { connectToMongo } from "./utils/db";
import { checkEnv } from "./utils/env";
import routerFactory from "./routes";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/auth";

const app = express();

const PORT: number = 8080;

interface CustomRequest extends Request {
  _id?: string;
}

app.use(express.json());
app.use(cookieParser());

app.use("/api", routerFactory);

app.get("/test", auth, (req: Request, res: Response) => {
  const customReq = req as CustomRequest;

  console.log("req", customReq._id);

  res.json({ ok: "ok" });
  return;
});

connectToMongo().then(() => {
  console.log("DB Connected ");
  checkEnv();
  console.log("Staring Server........");
  app.listen(PORT, () => {
    console.log(`Your server is running on http://localhost:${PORT}`);
  });
});

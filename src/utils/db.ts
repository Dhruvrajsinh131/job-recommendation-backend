import { connect } from "mongoose";
import { env } from "./env";

export const connectToMongo = () => {
  return connect(env.MONGODB_URL);
};

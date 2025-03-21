import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  comparePassword(password: string): Promise<boolean>;
}

interface createUserBody {
  email: string;
  name: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    if (error instanceof Error) next(error);
  }
});

const userModel = model<IUser>("User", userSchema);

const createUser = async (body: createUserBody): Promise<IUser> => {
  const newUser = new userModel(body);

  await newUser.save();

  return newUser;
};

export default userModel;

export { createUser };

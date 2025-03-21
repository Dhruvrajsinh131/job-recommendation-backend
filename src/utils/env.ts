import { configDotenv } from "dotenv";
import { z, ZodError } from "zod";
configDotenv();

const envSchema = z.object({
  MONGODB_URL: z.string(),
  JWT_SECRET: z.string(),
});

export const checkEnv = () => {
  try {
    envSchema.parse({
      MONGODB_URL: process.env.MONGODB_URL,
      JWT_SECRET: process.env.JWT_SECRET,
    });
    console.log("✅ All required environment variables are set.");
  } catch (error) {
    if (error instanceof ZodError)
      console.error(
        "❌ Invalid or missing environment variables:",
        error.errors
      );
    process.exit(1);
  }
};

export const env = envSchema.parse({
  JWT_SECRET: process.env.JWT_SECRET,
  MONGODB_URL: process.env.MONGODB_URL,
});

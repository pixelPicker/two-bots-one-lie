import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db/db.js";

import { anonymous } from "better-auth/plugins";

export const auth = betterAuth({
  plugins: [anonymous()],
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
});

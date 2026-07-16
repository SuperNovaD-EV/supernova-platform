import { z } from "zod";

export const publicClientEnvSchema = z.object({
  supabaseUrl: z.url().optional().or(z.literal("")),
  supabasePublishableKey: z.string().optional().or(z.literal("")),
  sentryDsn: z.url().optional().or(z.literal("")),
});

export const serverEnvSchema = z.object({
  SUPABASE_SECRET_KEY: z.string().optional().or(z.literal("")),
  SUPABASE_PROJECT_REF: z.string().optional().or(z.literal("")),
  SUPABASE_DB_PASSWORD: z.string().optional().or(z.literal("")),
  SENTRY_AUTH_TOKEN: z.string().optional().or(z.literal("")),
  SUPERNOVA_GITHUB_OWNER: z.string().optional().or(z.literal("")),
  SUPERNOVA_SUPABASE_REGION: z.string().optional().or(z.literal("")),
  ALLOW_REMOTE_DB_PUSH: z.enum(["true", "false"]).default("false"),
});

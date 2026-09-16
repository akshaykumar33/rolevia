import { z } from 'zod';

export const EnvironmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'staging', 'production']).default('development'),
  APP_PORT: z.coerce.number().default(3000),
  APP_URL: z.string().url().default('http://localhost:3000'),
  DATABASE_URL: z.string().min(1).default('postgresql://rolevia_dev:rolevia_dev@localhost:5432/rolevia_development'),
  REDIS_URL: z.string().min(1).default('redis://localhost:6379/0'),
  SESSION_SECRET: z.string().min(16).default('development_insecure_session_secret_min16chars'),
  JWT_SECRET: z.string().min(16).default('development_insecure_jwt_secret_min16chars'),
  AI_PROVIDER: z.enum(['mock', 'openai', 'anthropic']).default('mock'),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

export function validateEnvironment(env: Record<string, unknown> = process.env): Environment {
  const result = EnvironmentSchema.safeParse(env);
  if (!result.success) {
    console.error('Invalid environment configuration:', result.error.format());
    throw new Error('Environment configuration validation failed');
  }
  return result.data;
}

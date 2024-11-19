import { z } from 'zod';

export const validateRegistration = (data) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2)
  });

  return schema.safeParse(data);
};

export const validateLogin = (data) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
  });

  return schema.safeParse(data);
};
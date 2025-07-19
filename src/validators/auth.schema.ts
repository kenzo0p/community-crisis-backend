import { z } from 'zod';
export const RoleEnum = z.enum(['ADMIN', 'VOLUNTEER', 'CITIZEN']);
export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
});
export type loginType = z.infer<typeof loginSchema>;
export const signupSchema = z.object({
  username: z.string().min(4),
  email: z.string().email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: RoleEnum,
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian mobile number'),
});

export type signupType = z.infer<typeof signupSchema>;

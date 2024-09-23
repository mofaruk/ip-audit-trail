import { object, string } from "zod";

export const signUpSchema = object({
  name: string()
    .trim()
    .min(3, { message: 'Name must be at least 3 characters' })
    .max(32, { message: 'Nme must be under 32 characters' }),
  email: string()
    .trim()
    .min(1, { message: 'Please enter an email address' })
    .max(32, { message: 'Email must be under 32 characters' })
    .email({ message: 'Please enter a valid email address' }),
  password: string()
    .trim()
    .min(1, { message: 'Please enter a password' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(24, { message: 'Password must be under 24 characters' }),
  password_confirmation: string()
    .trim()
    .min(1, { message: 'Please confirm your password' })
    .min(6, { message: 'Password must be at least 6 characters' })
    .max(24, { message: 'Password must be under 24 characters'}),
})
.refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ['password_confirmation'],
});

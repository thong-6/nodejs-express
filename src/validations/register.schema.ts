import { getEmailUnique } from "services/client/auth.service";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, { message: 'Mật khẩu phải nhiều hơn 7 ký tự' })
  .max(20, { message: 'Mật khẩu không được quá 20 ký tự' })
//   .refine((password) => /[A-Z]/.test(password), {
//     message: uppercaseErrorMessage,
//   })
//   .refine((password) => /[a-z]/.test(password), {
//     message: lowercaseErrorMessage,
//   })
//   .refine((password) => /[0-9]/.test(password), { message: numberErrorMessage })
//   .refine((password) => /[!@#$%^&*]/.test(password), {
//     message: specialCharacterErrorMessage,
//   });

const username = z
  .string()
  .email("Email không đúng định dạng")
  .refine(async (email) => {
    const existingUser = await getEmailUnique(email);
    return !existingUser;
  }, {
    message: "Email đã được sử dụng cho tài khoản khác",
    path: ["email"],

  }
  );
export const RegisterSchema = z
  .object({
    fullName: z.string().trim().min(1, { message: 'Tên không được để trống' }),
    username: username,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không chính xác',
    path: ['confirmPassword'],
  });
export type TRegisterSchema = z.infer<typeof RegisterSchema>
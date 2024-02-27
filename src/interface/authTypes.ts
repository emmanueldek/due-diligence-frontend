import * as yup from "yup";

export const characterCaseRegex = /(?=.*[a-z])(?=.*[A-Z])\w+/;
export const numberRegex = /\d/;
export const speccialCharcterRegex = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;

export interface ILoginProps {
  email: string;
  password: string;
}

export interface IWorkspaceProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  token: string | null;
}

export interface ICreatePassword {
  password: string;
  confirmPassword: string;
}

export const passwordSchema = yup
  .string()
  .required("This field is required.")
  .min(4, "Password must be 8 or more characters.")
  .matches(characterCaseRegex, "Password must contain at least one uppercase and lowercase character.")
  .matches(numberRegex, "Password must contain at least one number.")
  .matches(speccialCharcterRegex, "Password must contain at least one special character.");

const confirmPasswordSchema = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords must match")
  .required("Confirm Password is required");

export const createPasswordSchema = yup.object().shape({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

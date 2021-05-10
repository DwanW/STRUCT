import validator from "validator";
import { RegisterInput } from "../generated/graphql";

export const isRegisterInputValid = ({
  username,
  email,
  password,
}: RegisterInput) => {
  if (!validator.isLength(username, { min: 4, max: 30 })) {
    return "username must be between 4 and 30 characters";
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    return "password must be between 6 and 30 characters";
  }

  if (!validator.isEmail(email)) {
    return "email must be valid";
  }

  return true;
};

export const isLoginInputValid = (email: string, password: string) => {
  if (!validator.isEmail(email)) {
    return "email must be valid";
  }

  if (!validator.isLength(password, { min: 6, max: 30 })) {
    return "password must be between 6 and 30 characters";
  }
  return true;
};

export const isForgotPasswordInputValid = (email: string) => {
  if (!validator.isEmail(email)) {
    return "email must be valid";
  }
  return true;
};

export const isChangePasswordInputValid = (password: string) => {
  if (!validator.isLength(password, { min: 6, max: 30 })) {
    return "password must be between 6 and 30 characters";
  }
  return true;
};

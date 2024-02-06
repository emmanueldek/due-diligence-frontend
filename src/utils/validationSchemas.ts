import * as yup from "yup";

export const updateProfileValidationSchema = yup.object().shape({
  firstName: yup.string().min(4, "name is too short."),
  lastName: yup.string().min(4, "name is too short."),
  email: yup.string().email("Work email must be valid."),
  position: yup.string(),
  avatar: yup.string(),
});

export type TUpdateProfile = yup.InferType<typeof updateProfileValidationSchema>;

import * as Yup from "yup";

// const passwordStrengthRegex = new RegExp(
//   `^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$`
// );

export const signinSchema = Yup.object({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
  password: Yup.string().required("Este campo es requerido"),
});

export const signupSchema = Yup.object({
  email: Yup.string()
    .email("Email invalido")
    .required("Este campo es requerido"),
  // password: Yup.string()
  //   .min(8, "¡La contraseña es demasiado corta!")
  //   .required("Este campo es requerido")
  //   .matches(
  //     passwordStrengthRegex,
  //     "La contraseña debe tener almenos 8 caracteres, 2 Mayusculas, 1 caracter especial (!@#$&*), 2 numeros (0-9), 3 minusculas"
  //   ),
  firstName: Yup.string().required("Este campo es requerido"),
  lastName: Yup.string().required("Este campo es requerido"),
});

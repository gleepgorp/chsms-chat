import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&}])[A-Za-z\d@$!%*?&]{8,}$/;

// sign up-schema
export const signUpSchema = yup.object().shape({
  lastname: yup  
    .string()
    .required("Firstname is required"),
  firstname: yup  
    .string()
    .required("Lastname is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters")
    .matches(passwordRules, { message: "Please create a stronger password" })
    .required("Password is required"),
  confirmPassword: yup  
    .string()
    .oneOf([yup.ref('password')], "Passwords must match")
    .required() 
})

// login-schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be atleast 8 characters")
    .matches(passwordRules, "Password must be alphanumeric")
    .required("Password is required")
})
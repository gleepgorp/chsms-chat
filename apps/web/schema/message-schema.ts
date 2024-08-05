import * as yup from 'yup';

// sending mssg schema
export const messageSchema = yup.object().shape({
  content: yup
  .string()
  .required(),
})
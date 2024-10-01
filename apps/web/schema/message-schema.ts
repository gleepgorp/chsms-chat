import * as yup from 'yup';

// sending mssg schema
export const messageSchema = yup.object().shape({
  content: yup.string().when('$existingFiles', (existingFiles, schema) => {
    return existingFiles && existingFiles.length > 0
    ? schema.notRequired() : schema.required();
  })
})
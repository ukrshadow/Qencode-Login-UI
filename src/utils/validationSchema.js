import * as yup from "yup";

export const validationSchema = yup.object().shape({
    email: yup.string().email().min(15).required(),
    password: yup.string().min(5),
});


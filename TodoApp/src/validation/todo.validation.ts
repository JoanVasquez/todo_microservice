import { body } from "express-validator";

export default [body("title").not().isEmpty().withMessage("Field Required")];

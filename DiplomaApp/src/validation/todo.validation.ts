import { body } from "express-validator";

export default [
  body("title").not().isEmpty().withMessage("Field Required"),
  body("name").not().isEmpty().withMessage("Field Required"),
  body("dscription").not().isEmpty().withMessage("Field Required"),
];

import student from "../Controllers/student.js";
import express from 'express';
const studentRouter=express.Router();

studentRouter.post('/',student.studentSignUp);

export default studentRouter;
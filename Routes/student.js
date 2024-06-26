import express from 'express';
import student from '../Controllers/student';

const studentRouter = express.Router();
studentRouter.post('/', student.studentSignUp);
studentRouter.get('/find',student.getStudent);
studentRouter.put('/update/:id',student.updatestudent);
studentRouter.delete('/delete/:id',student.deleteStudent);
studentRouter.get('/pagination',student.getPagination);
studentRouter.get('/search',student.getSearch);
studentRouter.post('/app',student.apply);
studentRouter.get('/progress',student.studentProgress);
export default studentRouter;

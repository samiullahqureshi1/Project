import { studentModel } from "../Models/student";

const studentSignUp = (req, res) => {
	const {
		FirstName,
		LastName,
		Email,
		password,
		PhoneNumber,
		CNICNumber,
		qualification,
		coursesAllowed,
		usertype,
		otherQualification,
	} = req.body;
	const newStudent = new studentModel({
		FirstName,
		LastName,
		Email,
		password,
		PhoneNumber,
		CNICNumber,
		qualification,
		coursesAllowed,
		usertype,
		otherQualification,
	});
	newStudent.save().then(user => {
		if (user) {
			res.status(201).send(user);
		} else {
			res.status(404).send('unable to post');
		}
	});
};

export default { studentSignUp };

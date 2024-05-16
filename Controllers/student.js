import { studentModel } from '../Models/student';

const studentSignUp = (req, res) => {
	const {
		courseCompleted,
		courseName,
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
	const newStudent = studentModel({
		courseCompleted,
		courseName,
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

const getStudent = (req, res) => {
	studentModel.find().then(users => {
		if (users) {
			res.status(201).send(users);
		} else {
			res.status(404).send('unable to get');
		}
	});
};

const updatestudent = (req, res) => {
	const { id } = req.params;
	const query = { $set: req.body };
	studentModel.findByIdAndUpdate(id, query, (err, results) => {
		if (err) {
			res.status(404).send('unable to update');
		} else {
			res.status(201).send({
				message: 'successfully updated',
				results,
			});
		}
	});
};

const deleteStudent = (req, res) => {
	const { id } = req.params;
	const query = { $set: req.body };
	studentModel.findByIdAndRemove(id, query, (err, result) => {
		if (err) {
			res.status(404).send('unable to delete');
		} else {
			res.status(201).send({
				message: 'successfully deleted',
				result,
			});
		}
	});
};

const getPagination = async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const perPage = parseInt(req.query.perPage) || 10;
	const totalPosts = studentModel.countDocuments();
	const totalPages = Math.ceil(totalPosts / perPage);
	if (page > totalPages) {
		return res.status(404).send('UNABLE TO SEND');
	}

	const posts = await studentModel
		.find()
		.skip((page - 1) * perPage)
		.limit(perPage)
		.exec();
	res.status(201).json({ posts, totalPages, page });
};

const getSearch = (req, res) => {
	const { courseName } = req.query;
	console.log(courseName);
	const regexPattern = new RegExp(courseName, 'i');
	studentModel
		.find({ courseName: { $regex: regexPattern } })
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
};

const apply = (req, res) => {
	const { courseName } = req.query;
	console.log(courseName);
	const studentId = req.query.student || '6641ce88e9e63a41cf8b7d44';
	const limit = 10;
	if (studentModel[studentId] && studentModel[studentId].length >= limit) {
		return res.status(400).json({
			error:
				'You have already reached the maximum limit of course enrollments.',
		});
	}

	if (!studentModel[studentId]) {
		studentModel[studentId] = [];
	}
	studentModel[studentId].push(courseName);

	return res.status(200).json({ message: 'Course enrollment successful.' });
};

const studentProgress = (req, res) => {
	const { FirstName } = req.query;
	console.log(FirstName);
	const regexPattern = new RegExp(FirstName, 'i');
	studentModel.find({FirstName:{$regex: regexPattern }}).then(result => {
		if (result) {
			res.status(200).send(result);
		} else {
			res.status(404).send('unable to find');
		}
	});
};

export default {
	studentSignUp,
	getStudent,
	updatestudent,
	deleteStudent,
	getPagination,
	getSearch,
	apply,
	studentProgress,
};

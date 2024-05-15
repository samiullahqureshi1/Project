import { studentModel } from '../Models/student';

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
	const newStudent = studentModel({
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
	const { usertype } = req.query;
	console.log(usertype);
	const regexPattern = new RegExp(usertype, 'i');
	studentModel
		.find({ usertype: { $regex: regexPattern } })
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json({ error: err.message });
		});
};

export default {
	studentSignUp,
	getStudent,
	updatestudent,
	deleteStudent,
	getPagination,
	getSearch,
};

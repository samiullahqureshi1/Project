import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
	courseName:String,
	courseCompleted:Number,
	FirstName: String,
	LastName: String,
	Email: String,
	password: String,
	PhoneNumber: Number,
	CNICNumber: Number,
	qualification: String,
	coursesAllowed: Number,
	usertype: String,
	otherQualification: [String],
});

export const studentModel = mongoose.model('student', studentSchema);

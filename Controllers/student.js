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
	const newStudent =studentModel({
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

const getStudent=(req,res)=>{
    studentModel.find().then((users)=>{
        if(users){
            res.status(201).send(users);
        }else{
            res.status(404).send('unable to get');
        }
    });
    
};

const updatestudent=(req,res)=>{
    const {id}=req.params;
    const query={$set:req.body};
    studentModel.findByIdAndUpdate(id,query,(err,results)=>{
        if(err){
            res.status(404).send('unable to update');
        }else{
            res.status(201).send({
                message:'successfully updated',
                results,
            });
        };
    });
};

const deleteStudent=(req,res)=>{
    const {id}=req.params;
    const query={$set:req.body};    
    studentModel.findByIdAndRemove(id,query,(err,result)=>{
        if(err){
            res.status(404).send('unable to delete');
        }else{
            res.status(201).send({
                message:'successfully deleted',
                result,
            });
        }
    });
};

export default { studentSignUp,getStudent,updatestudent,deleteStudent};

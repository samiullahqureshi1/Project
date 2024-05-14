import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema(
	{
		name: String,
		time: String,
		description: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('Events', EventSchema);

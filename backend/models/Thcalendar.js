const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Schema.Types.Date,
		required: true,
	},
	repeat: {
		type: String,
		default: 'None',
	},
});

const calendarSchema = new Schema(
	{
		therapistID: {
			type: Schema.Types.ObjectId,
			ref: 'Therapist',
			required: true,
		},
		events: {
			type: [appointmentSchema],
			default: [],
		},
	},
	{ timestamps: true }
);

const TherapistCalendar = mongoose.model('TherapistCalendar', calendarSchema);
//const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = { TherapistCalendar /*, Appointment */ };

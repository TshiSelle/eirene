const { validateAppInput } = require("../helperFunctions/inputValidation");
const { Calendar } = require("../models/calendar");



const create = (req, res) => {
    
    const { errors, isValid } = validateAppInput(req.body);

    if (!isValid) {
        res.status(400).json({ ...errors, success: false });
    } else {
        Calendar.findOne({ UID: req.user.id })
            .then((dbCalendar) => {
                if (dbCalendar) {
                    const { title, description, date, repeat } = req.body;
                    const newAppointment = { title, description, date, repeat };
                    dbCalendar.events.push(newAppointment);
                    dbCalendar.save()
                        .then(() => res.status(200).json({ message: 'Appointment created successfully', success: true }))
                        .catch((err) => res.status(400).json({ message: `Error occurred while saving event to db : ${err}`, 
                                                               success: false }));
                } else {
                    let events = [];
                    events.push(appointment);
                    const newCal = new Calendar({
                        UID: req.user.id,
                        events
                    });
                    newCal.save()
                        .then(() => res.status(200).json({ message: 'Calendar initialized, Appointment created successfully', 
                                                           success: true }))
                        .catch((err) => res.status(400).json({ message: `Error occurred while saving event to db : ${err}`, 
                                                               success: false }));
                }
            })
            .catch((err) => {
                res.status(400).json({ message: `Error occurred while searching user\'s calendar : ${err}` ,
                                       success: false});
            });
    }
};


module.exports = { create }; 
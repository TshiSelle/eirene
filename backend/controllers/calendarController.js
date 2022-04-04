const { validateAppInput, validateObjectID } = require("../helperFunctions/inputValidation");
const { Calendar } = require("../models/calendar");

const getAppointments = (req, res) => {
    Calendar.findOne({ UID: req.user.id })
        .then((dbCalendar) => {
            if (dbCalendar) {
                res.status(201).json({ ...dbCalendar.events, success: true  });
            } else {
                res.status(201).json({ message: 'No events found', success: true })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: `Error occurred while searching for user\'s calendar : ${err}`, success: false });
        })
}

const createAppointment = (req, res) => {
    
    const { errors, isValid } = validateAppInput(req.body);

    if (!isValid) {
        res.status(400).json({ ...errors, success: false });
    } else {
        Calendar.findOne({ UID: req.user.id })
            .then((dbCalendar) => {
                const { title, description, date, repeat } = req.body;
                const newAppointment = { title, description, date, repeat };
                if (dbCalendar) {
                    dbCalendar.events.push(newAppointment);
                    dbCalendar.save()
                        .then(() => res.status(200).json({ message: 'Appointment created successfully', success: true }))
                        .catch((err) => res.status(400).json({ message: `Error occurred while saving event to db : ${err}`, 
                                                               success: false }));
                } else {
                    let events = [];
                    events.push(newAppointment);
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

const modifyAppointment = (req, res) => {
    const { title, description, date, repeat } = req.body;
    const { errors, isValid } = validateAppInput(req.body);


    if (!isValid) {
        res.status(400).json({ ...errors, success: false });
    } else if (!validateObjectID(req.params.eventID)) {
        res.status(400).json({ message: 'eventID provided is not a valid mongoDB objectid', success: false });
    } else {
        Calendar.findOne({ UID: req.user.id })
            .then((dbCalendar) => {
                appointmentFound = false;
                for (i=0;i<dbCalendar.events.length;i++) {{}
                    if (dbCalendar.events[i]._id == req.params.eventID){
                        dbCalendar.events[i] = { title, description, date, repeat };
                        dbCalendar.save();
                        appointmentFound = true;
                        break;
                    }
                }
                if (appointmentFound) {
                    res.status(201).json({ message: 'Appointment updated successfully', success: true })
                } else {
                    res.status(400).json({ message: `No appointment with id ${req.params.eventID}`, success: false });
                }
                
            })
            .catch((err) => {
                res.status(400).json({ message: `Error occurred while searching user\'s calendar : ${err}` ,
                                       success: false});
            });
    }
};
const deleteAppointment = (req, res) => {
    if (!validateObjectID(req.params.eventID)) {
        res.status(400).json({ message: 'eventID provided is not a valid mongoDB objectid', success:false });
    } else {
        Calendar.findOne({ UID: req.user.id })
            .then((dbCalendar) => {
                appointmentFound = false;
                for (i=0;i<dbCalendar.events.length;i++) {{}
                    if (dbCalendar.events[i]._id == req.params.eventID){
                        dbCalendar.events.splice(i,1);
                        dbCalendar.save();
                        appointmentFound = true;
                        break;
                    }
                }
                if (appointmentFound) {
                    res.status(201).json({ message: 'Appointment removal successful', success: true })
                } else {
                    res.status(400).json({ message: `No appointment with id ${req.params.eventID}`, success: false });
                }
                
            })
            .catch((err) => {
                res.status(400).json({ message: `Error occurred while searching user\'s calendar : ${err}` ,
                                       success: false});
            });
    }
};


module.exports = { 
    createAppointment,
    getAppointments,
    deleteAppointment,
    modifyAppointment
}; 
const { Calendar, /*Appointment*/ } = require("../models/calendar");



const create = (req, res) => {
    const appointment = /*new Appointment(*/{
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        repeat: req.body.repeat,
    }/*)*/;
    let events = [];
    events.push(appointment);
    const newCal = new Calendar({
        UID: req.user.id,
        events
    });
    newCal.save();

    res.status(200).json({ message: 'Calendar created', success: true, newCal });
};


module.exports = { create }; 
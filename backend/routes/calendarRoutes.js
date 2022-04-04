const express = require('express');
const calendarController = require('../controllers/calendarController');
const router = express.Router();

router.post('/create', calendarController.createAppointment);
router.get('/getUserAppointments', calendarController.getAppointments);
router.patch('/modify/:eventID', calendarController.modifyAppointment);
router.delete('/deleteAppointment/:eventID', calendarController.deleteAppointment);


module.exports = router;
const express = require('express');
const calendarController = require('../controllers/calendarController');
const verifyJWT = require('../middleware/TokenVerification');
const router = express.Router();

router.post('/create', verifyJWT, calendarController.createAppointment);
router.get('/getUserAppointments', verifyJWT, calendarController.getAppointments);
router.patch('/modify/:eventID', verifyJWT, calendarController.modifyAppointment);
router.delete('/deleteAppointment/:eventID', verifyJWT, calendarController.deleteAppointment);
router.post('/therapist/create', calendarController.createAppointmentTherapist);
router.get('/therapist/getTherapistAppointments/:therapistID', calendarController.getAppointmentsTherapist);
router.patch('/therapist/modify/:eventID', calendarController.modifyAppointmentTherapist);
router.delete('/therapist/:therapistID/deleteAppointment/:eventID', calendarController.deleteAppointmentTherapist);

module.exports = router;

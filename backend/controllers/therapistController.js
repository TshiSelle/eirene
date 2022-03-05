const isEmpty = require("is-empty");
const mongoose = require("mongoose");
const { Therapist } = require("../models/therapist");

const create =  (req, res) => {
    const newTherapist = new Therapist({
      fname: req.body.fname,
      lname: req.body.lname,
      gender: req.body.gender,
      degree: req.body.degree,
      university: req.body.university,
      officeAddress: req.body.officeAddress,
      phone: req.body.phone,
      description: req.body.description,
      username: req.body.username,
      email: req.body.email,
      yearsOfExperience: req.body.yearsOfExperience,
      title : req.body.title
    });
    newTherapist.save()
    .then(() => {
      res.status(201).json({ message: 'Created therapist profile successfully' })
    })
    .catch((err) => {
      res.status(400).json({ message: `Error occurred during therapist account creation`, error: `${err}` })
    });
  }

const getTherapist = async (req, res) => {
    const { id } = req.params;
    if (isEmpty(id) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message:'ID not valid', success: false });
    }
    else {
        Therapist.findById(id)
            .then((dbTherapist) => {
                if (dbTherapist) {
                    return res.status(200).json({ dbTherapist, success: true });
                }
                else {
                    return res.status(404).json({ message: `No therapists with id : ${id}`, success: false })
                }
            })
            .catch((err) => {
                return res.status(400).json({ message : `${err}`, success: false })
            });

    }

}

module.exports = {
    create,
    getTherapist
};
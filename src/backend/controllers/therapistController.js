const isEmpty = require("is-empty");
const mongoose = require("mongoose");
const { Therapist } = require("../models/therapist");


const getTherapist = async (req, res) => {
    const { id } = req.params;
    if (isEmpty(id) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message:'ID not valid', success: false });
    }
    else {
        Therapist.findById(id)
            .then((dbTherapist) => {
                if (dbTherapist) {
                    return res.status(200).json(dbTherapist);
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
    getTherapist
};
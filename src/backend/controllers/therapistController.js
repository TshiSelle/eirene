const isEmpty = require("is-empty");
const { Therapist } = require("../models/therapist");


const getTherapist = async (req, res) => {
    if (isEmpty(req.params.id)) {
        return res.status(404).json({ message:'ID not available', success: false });
    }

    Therapist.findById(req.params.id)
        .then((dbTherapist) => {
            return res.status(200).json(dbTherapist);
        })
        .catch((err) => {
            return res.status(400).json({ message : `${err}`, success: false })
        });
}

module.exports = {
    getTherapist
};
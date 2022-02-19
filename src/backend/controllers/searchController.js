const isEmpty = require('is-empty');
const { Therapist } = require('../models/therapist');

const searchTherapists = async (req, res) => {
    if (isEmpty(req.query.searchString)) {
        res.status(400).json({ message: 'Search field is empty, please add input', success: false });
    }
    try {
        const searchResults = await Therapist.find({ 
            $or: [ { fname : { $regex: ".*"+req.query.searchString+".*", $options: "i" } },
                   { lname : { $regex: ".*"+req.query.searchString+".*", $options: "i" } },
                   { $text : { $search: req.query.searchString } }
                ],
            
         });
        
         res.status(200).json({ searchResults, success: true })
    } catch (error) {
        return res.status(400).json({ message: `Error occurred while searching for therapists`, success: false, error: error })
    }
    


};

module.exports = { searchTherapists };
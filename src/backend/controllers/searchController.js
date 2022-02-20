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
            $and: [
                { gender : req.query.gender || { $regex: /.*/ } },
                { degree : req.query.degree || { $regex: /.*/ } },
                { yearsOfExperience : req.query.yoe || { $gte: 0 } },
                { title : { $regex: req.query.title ?  ".*"+req.query.title+".*" : /.*/, $options: "i" } },
            ],
         });
        
         res.status(200).json({ numOfResults: searchResults.length, success: true, searchResults })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: `Error occurred while searching for therapists`, success: false, error: error })
    }
    


};

module.exports = { searchTherapists };


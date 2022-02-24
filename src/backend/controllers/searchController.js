const isEmpty = require('is-empty');
const { Therapist } = require('../models/therapist');
const { validateSearchInput } = require('../helperFunctions/inputValidation');

const searchTherapists = async (req, res) => {
    if (isEmpty(req.query.searchString)) {
        return res.status(400).json({ message: 'Search field is empty, please add input', success: false });
    }
    const perPage = 10;
    const pageNum = isEmpty(req.query.pageNum) || req.query.pageNum < 1 ? 1 : req.query.pageNum;

    const { errors, isValid } = validateSearchInput(req.query);

    if (!isValid) {
        return res.status(400).json({ ...errors, success: false })
    }
    else {
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
             },
             { _id: 0, __v: 0, score: { $meta: 'textScore' } })
             .limit(perPage)
             .skip((pageNum-1) * perPage)
             .sort({ score: { $meta: 'textScore' } });
            
            return res.status(200).json({ numOfResults: searchResults.length, success: true, searchResults })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: `Error occurred while searching for therapists`, success: false, error: error })
        }

    }
   
    


};

module.exports = { searchTherapists };


const isEmpty = require('is-empty');
const mongoose = require('mongoose')
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
            const query = { 
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
            };

            const searchResults = await Therapist.find(query,{ _id: 0, __v: 0, score: { $meta: 'textScore' } })
                                            .limit(perPage)
                                            .skip((pageNum-1) * perPage)
                                            .sort({ score: { $meta: 'textScore' } });

            const numOfResults = await Therapist.countDocuments(query);

            if (pageNum > Math.ceil(numOfResults / 10)) {
                return res.status(400).json({ message: 'Page number too large', success: false, numOfResults })
            }
        
            return res.status(200).json({ numOfResults, success: true, searchResults })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ message: `Error occurred while searching for therapists`, success: false, error: error })
        }

    }
   
    


};

module.exports = { searchTherapists };


const isEmpty = require('is-empty');
const { Therapist } = require('../models/therapist');
const { validateSearchInput } = require('../helperFunctions/inputValidation');

const searchTherapists = async (req, res) => {
	let { searchString, pageNum, gender, degree, minYOE, maxYOE, title } = req.query;
	if (isEmpty(searchString)) {
		searchString = '';
	}

	const therapistsPerPage = 12;
	pageNum = isEmpty(pageNum) || pageNum < 1 ? 1 : pageNum;
	const { errors, isValid } = validateSearchInput(req.query);

	if (!isValid) {
		return res.status(400).json({ ...errors, success: false });
	} else {
		try {
			const query = {
				$or: [
					{ fname: { $regex: '.*' + searchString + '.*', $options: 'i' } },
					{ lname: { $regex: '.*' + searchString + '.*', $options: 'i' } },
					{ $text: { $search: searchString } },
				],
				$and: [
					{ gender: gender || { $regex: /.*/ } },
					{ degree: degree || { $regex: /.*/ } },
					{ yearsOfExperience : { $gte : minYOE || 0, $lte : maxYOE || 20 } }, 
					{
						title: {
							$regex: title ? '.*' + title + '.*' : /.*/,
							$options: 'i',
						},
					},
				],
			};

			const searchResults = await Therapist.find(query, {
				__v: 0,
				score: { $meta: 'textScore' },
			})
				.limit(therapistsPerPage)
				.skip((pageNum - 1) * therapistsPerPage)
				.sort({ score: { $meta: 'textScore' } });

			const numOfResults = await Therapist.countDocuments(query);

			if (numOfResults > 0 && pageNum > Math.ceil(numOfResults / therapistsPerPage)) {
				return res.status(400).json({
					message: 'Page number too large',
					success: false,
					numOfResults,
				});
			}

			return res.status(200).json({
				numOfResults,
				numOfPages: Math.ceil(numOfResults / therapistsPerPage),
				success: true,
				searchResults,
			});
		} catch (error) {
			console.log(error);
			return res.status(400).json({
				message: `Error occurred while searching for therapists`,
				success: false,
				error: error,
			});
		}
	}
};

module.exports = { searchTherapists };

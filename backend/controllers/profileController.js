const { User } = require('../models/user');
const { validateNameChangeInput } = require('../helperFunctions/inputValidation');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const fs = require('fs-extra');


const changeName = (req, res) => {
	const { fname, lname } = req.body;
	const { errors, isValid } = validateNameChangeInput(req.body);
	if (!isValid) {
		res.status(400).json({ ...errors, success: false });
	} else {
		User.findById(req.user.id)
			.then((dbUser) => {
				if (!dbUser) {
					res.status(400).json({ message: 'User not found', success: false });
				} else {
					dbUser.fname = fname;
					dbUser.lname = lname;
					dbUser
						.save()
						.then(() => {
							res.status(202).json({ message: 'Name updated successfully', success: true });
						})
						.catch((err) => {
							res.status(500).json({
								message: `Error occurred while saving to database : ${err}`,
							});
						});
				}
			})
			.catch((err) => {
				res.status(500).json({
					message: `Error occurred while searching for user : ${err}`,
				});
			});
	}
};

const setProfilePicture = async (req, res) => {
	console.log(req.files.File)
	if (!req.files || req.files.File?.size <= 0) 
		res.status(400).send({ message: 'No files uploaded, please provide an image', success: false});
	else {
		const dbUser = await User.findById(req.user.id);
		const hasProfilePic = !!dbUser.profilePic;
		let file = req.files.File;
		console.log(req.files);
		const filetype = file.mimetype.substring(file.mimetype.indexOf('/') + 1);
		file.name = hasProfilePic ? dbUser.profilePic : `${dbUser.username}_${crypto.randomBytes(20).toString('hex')}.${filetype}` 
		// File.name = `${dbUser.username}_${crypto.randomBytes(20).toString('hex')}`;
		fs.outputFileSync(`./tmp/${file.name}`, file.data)
		cloudinary.uploader.upload(
			`./tmp/${file.name}`,
			{
				public_id: `user_pics/${file.name}`,
				unique_filename: false,
				resource_type: 'image',
				overwrite: true,
			},
			async (err, result) => {
				if (!err) {
					try {
						if (!hasProfilePic) {
							dbUser.profilePic = file.name;
							await dbUser.save()
						}
						res.status(201).json({ message: 'Image upload complete', success: true, result });
					} catch (error) {
						res.status(400).json({ message: 'Error occurred hwile modifying user db info', err, success: false });
					}
				} else {
					res.status(400).json({ message: 'Error occurred while uploading image', err, result, success: false  });
				}
				fs.removeSync('./tmp')
			}
		);
		// fs.writeFileSync(name, data);
	}
	// cloudinary.uploader.upload();
	console.log('uploaded');
};

/*
app.post('/upload', fileUpload(),);
  File: {
	name: 'BLACK.png',
	data: <Buffer 89 50 4e 47 0d 0a 1a 0a 00 00 00 0d 49 48 44 52 00 00 07 80 00 
00 04 38 08 06 00 00 00 e8 d3 c1 43 00 00 00 01 73 52 47 42 00 ae ce 1c e9 00 00 
00 04 ... 10644 more bytes>,
	size: 10694,
	encoding: '7bit',
	tempFilePath: '',
	truncated: false,
	mimetype: 'image/png',
	md5: 'bdc303e4c3f0abfa5ae297654f36a31e',
	mv: [Function: mv]
  }
}
*/

module.exports = { 
	changeName,
	setProfilePicture
};

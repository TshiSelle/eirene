const Validator = require('validator');
const isEmpty = require('is-empty');
const mongoose = require('mongoose');

//********** Input validation functions **********

function validateRegisterInput(data) {
	let errors = {};
	let { fname, lname, gender, email, username, password, confirmPassword } = data;

	//converting empty fields to strings
	fname = !isEmpty(fname) ? fname : '';
	lname = !isEmpty(lname) ? lname : '';
	gender = !isEmpty(gender) ? gender : '';
	email = !isEmpty(email) ? email : '';
	username = !isEmpty(username) ? username : '';
	password = !isEmpty(password) ? password : '';
	confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';

	//field checks (empty input / password rules / etc..)
	//Name Checks
	if (Validator.isEmpty(fname)) {
		errors.fname = 'First name field is required';
	}
	if (Validator.isEmpty(lname)) {
		errors.lname = 'Last name field is required';
	} else if (!Validator.isAlpha(fname) || !Validator.isAlpha(lname)) {
		errors.name = 'Name can only contain letters';
	}
	//Gender Check
	if (Validator.isEmpty(gender)) {
		errors.gender = 'Gender field is required';
	} else if (
		!(Validator.equals(gender, 'male') || Validator.equals(gender, 'female') || Validator.equals(gender, 'other'))
	) {
		errors.gender = 'Wrong input in gender field';
	}
	//Email Check
	if (Validator.isEmpty(email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}
	//Username Check
	if (Validator.isEmpty(username)) {
		errors.username = 'Username field is required';
	} else if (hasWhiteSpace(Validator.trim(username))) {
		errors.username = 'Username should be one word';
	}
	//Password check
	if (Validator.isEmpty(password)) {
		errors.password = 'Password field is required';
	} else if (!Validator.isLength(password, { min: 8, max: 64 })) {
		errors.password = `Password must be at least 8 characters long${
			password.length > 64 ? ' and less than 64' : ''
		}`;
	} else if (Validator.isEmpty(confirmPassword)) {
		errors.confirmPassword = 'Confirm Password field is required';
	} else if (!Validator.equals(password, confirmPassword)) {
		errors.confirmPassword = 'Passwords must match';
	}
	return { errors, isValid: isEmpty(errors) };
}

function validateLoginInput(data) {
	let errors = {};
	let { username, password } = data;

	//converting empty fields to strings
	username = !isEmpty(username) ? username : '';
	password = !isEmpty(password) ? password : '';

	if (Validator.isEmpty(username)) {
		errors.username = 'Username field is required';
	}
	if (Validator.isEmpty(password)) {
		errors.password = 'Password field is required';
	}
	return { errors, isValid: isEmpty(errors) };
}

function validatePassChangeInput(data) {
	let errors = {};
	let { oldPassword, newPassword, confirmPassword } = data;

	oldPassword = !isEmpty(oldPassword) ? oldPassword : '';
	newPassword = !isEmpty(newPassword) ? newPassword : '';
	confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';
	//Password check
	if (Validator.isEmpty(oldPassword)) {
		errors.oldPassword = 'Old Password field is required';
	}
	if (Validator.isEmpty(newPassword)) {
		errors.newPassword = 'New Password field is required';
	} else if (!Validator.isLength(newPassword, { min: 8, max: 64 })) {
		errors.newPassword = `Password must be at least 8 characters long${
			newPassword.length > 64 ? ' and less than 64' : ''
		}`;
	} else if (Validator.isEmpty(confirmPassword)) {
		errors.confirmPassword = 'Confirm Password field is required';
	} else if (!Validator.equals(newPassword, confirmPassword)) {
		errors.confirmPassword = 'Password confirmation must match new password';
	}
	return { errors, isValid: isEmpty(errors) };
}

function validateEmail(data) {
	let errors = {};
	let email = data.email;
	email = !isEmpty(email) ? email : '';
	//Email Check
	if (Validator.isEmpty(email)) {
		errors.email = 'Email field is required';
	} else if (!Validator.isEmail(email)) {
		errors.email = 'Email is invalid';
	}
	return { errors, isValid: isEmpty(errors) };
}

function validatePassResetInput(data) {
	let errors = {};
	let { newPassword, confirmPassword } = data;

	newPassword = !isEmpty(newPassword) ? newPassword : '';
	confirmPassword = !isEmpty(confirmPassword) ? confirmPassword : '';
	//Password check
	if (Validator.isEmpty(newPassword)) {
		errors.newPassword = 'New Password field is required';
	} else if (!Validator.isLength(newPassword, { min: 8, max: 64 })) {
		errors.newPassword = `Password must be at least 8 characters long${
			newPassword.length > 64 ? ' and less than 64' : ''
		}`;
	} else if (Validator.isEmpty(confirmPassword)) {
		errors.confirmPassword = 'Confirm Password field is required';
	} else if (!Validator.equals(newPassword, confirmPassword)) {
		errors.confirmPassword = 'Password confirmation must match new password';
	}
	return { errors, isValid: isEmpty(errors) };
}

function validateSearchInput(queries) {
	let errors = {};
	let { searchString, gender, yoe, degree } = queries;

	searchString = !isEmpty(searchString) ? searchString : '';
	gender = !isEmpty(gender) ? gender : '';
	degree = !isEmpty(degree) ? degree : '';

	if (!Validator.isEmpty(gender) && !(Validator.equals(gender, 'male') || Validator.equals(gender, 'female'))) {
		errors.gender = `'${gender}' is not a valid value, choose 'male' or 'female'`;
	}
	if (!Validator.isEmpty(degree) && !(Validator.equals(degree, 'Phd') || Validator.equals(degree, 'Masters'))) {
		errors.degree = `'${degree}' is not a valid value, choose 'Phd' or 'Masters'`;
	}
	if (!isEmpty(yoe) && (isNaN(yoe) || yoe < 0 || yoe > 100)) {
		errors.yoe = `'${yoe}' is not valid value for yearsOfExperience. Range is 0-100`;
	}

	return { errors, isValid: isEmpty(errors) };
}

function validateNameChangeInput(data) {
	let errors = {};
	let { fname, lname } = data;
	fname = !isEmpty(fname) ? fname : '';
	lname = !isEmpty(lname) ? lname : '';
	//Name Checks
	if (Validator.isEmpty(fname)) {
		errors.fname = 'First name field is required';
	}
	if (Validator.isEmpty(lname)) {
		errors.lname = 'Last name field is required';
	} else if (!Validator.isAlpha(fname) || !Validator.isAlpha(lname)) {
		errors.name = 'Name can only contain letters';
	}
	return { errors, isValid: isEmpty(errors) };
}

function validateObjectID(id) {
	let errors = {};
	id = isEmpty(id) ? '' : id;

	if (Validator.isEmpty(id)) {
		errors.id = 'ID cannot be empty';
	} else if (!mongoose.Types.ObjectId.isValid(id)) {
		errors.id = 'ID is not a valid MongoDB ObjectID';
	}

	return { errors, isValid: isEmpty(errors) };
}

function validateAppInput(data) {
	let errors = {};
	const { title, description, date, repeat } = data;
	if (isEmpty(title)) {
		errors.title = 'Title is empty, please provide a title';
	}
	if (isEmpty(description)) {
		errors.description = 'Description is empty, please provide a description';
	}
	if (isEmpty(date)) {
		errors.datw = 'Date field is empty please provide a date';
	} else if (!Validator.isInt(date)) {
		errors.date = 'Date is invalid, provide date in milliseconds';
	} else if (Date.now() > date) {
		errors.date = 'Please provide only future dates';
	}
	if (isEmpty(repeat)) {
		errors.repeat = 'Repeat field is empty, options are : None-Daily-Weekly-Monthly';
	} else if (!Validator.isIn(repeat, ['None', 'Daily', 'Weekly', 'Monthly'])) {
		errors.repeat = 'Repeat field is invalid, options are : None-Daily-Weekly-Monthly';
	}

	return { errors, isValid: isEmpty(errors) };
}

module.exports = {
	validateLoginInput,
	validateRegisterInput,
	validatePassChangeInput,
	validateEmail,
	validatePassResetInput,
	validateSearchInput,
	validateNameChangeInput,
	validateObjectID,
	validateAppInput,
};

//mongoose.Types.ObjectId.isValid(id)

function hasWhiteSpace(s) {
	return /\s/g.test(s);
}

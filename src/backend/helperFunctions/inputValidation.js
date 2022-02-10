const Validator = require('validator');
const isEmpty = require('is-empty');


//********** Input validation functions **********

function validateRegisterInput(data) {
    let errors = {};

    //converting empty fields to strings
    data.fname = !isEmpty(data.fname) ? data.fname : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.gender = !isEmpty(data.gender) ? data.gender : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    
    //field checks (empty input / password rules / etc..)
    //Name Checks
    if (Validator.isEmpty(data.fname)) {
        errors.fname = 'First name field is required';
    } 
    if (Validator.isEmpty(data.lname)) {
        errors.lname = 'Last name field is required';
    }
    //Gender Check
    if (Validator.isEmpty(data.gender)) {
        errors.gender = 'Gender field is required';
    } else if (!(Validator.equals(data.gender,'male') || Validator.equals(data.gender,'female'))) {
        errors.gender = 'Wrong input in gender field'
    }
    //Email Check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    //Username Check
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }
    //Password check
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    } else if (!Validator.isLength(data.password, { min: 8, max: 64 })) {
        errors.password = `Password must be at least 8 characters long${data.password.length > 64 ? ' and less than 64': ''}`;
    } else if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required';
    } else if (!Validator.equals(data.password,data.confirmPassword)) {
        errors.confirmPassword = 'Passwords must match';
    }
    return { errors, isValid: isEmpty(errors) };
    
}

function validateLoginInput(data) {
    const errors = {};
    //converting empty fields to strings
    data.username = !isEmpty(data.username) ? data.username : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Username field is required';
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }
    return { errors, isValid: isEmpty(errors) };
}

function validatePassChangeInput(data) {
    let errors = {};
    data.oldPassword = !isEmpty(data.oldPassword) ? data.oldPassword : '';
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    //Password check
    if (Validator.isEmpty(data.oldPassword)) {
        errors.oldPassword = 'Old Password field is required';
    }
    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password field is required';
    } else if (!Validator.isLength(data.newPassword, { min: 8, max: 64 })) {
        errors.newPassword = `Password must be at least 8 characters long${data.newPassword.length > 64 ? ' and less than 64': ''}`;
    } else if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required';
    } else if (Validator.equals(data.oldPassword, data.newPassword)) {
        errors.newPassword  = 'Old and new password cannot be the same'
    } else if (!Validator.equals(data.newPassword, data.confirmPassword)) {
        errors.confirmPassword = 'Password confirmation must match new password';
    }
    return { errors, isValid: isEmpty(errors) };
}

function validateEmail(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    //Email Check
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    } else if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }
    return { errors, isValid: isEmpty(errors) };
    
}

function validatePassResetInput(data) {
    let errors = {};
    data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';
    //Password check
    if (Validator.isEmpty(data.newPassword)) {
        errors.newPassword = 'New Password field is required';
    } else if (!Validator.isLength(data.newPassword, { min: 8, max: 64 })) {
        errors.newPassword = `Password must be at least 8 characters long${data.newPassword.length > 64 ? ' and less than 64': ''}`;
    } else if (Validator.isEmpty(data.confirmPassword)) {
        errors.confirmPassword = 'Confirm Password field is required';
    } else if (!Validator.equals(data.newPassword, data.confirmPassword)) {
        errors.confirmPassword = 'Password confirmation must match new password';
    }
    return { errors, isValid: isEmpty(errors) };
}


module.exports = {
    validateLoginInput,
    validateRegisterInput,
    validatePassChangeInput,
    validateEmail,
    validatePassResetInput
};
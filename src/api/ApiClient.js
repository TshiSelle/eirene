import axios from 'axios';

function PostAxiosCall(endpoint, data, headers) {
	if (!data) data = {};
	if (!headers) headers = {};

	return axios({
		method: 'post',
		url: `http://localhost:8080${endpoint}`,
		data: data,
		headers: headers,
	});
}

function GetAxiosCall(endpoint, headers) {
	if (!headers) headers = {};
	return axios({
		method: 'get',
		url: `http://localhost:8080${endpoint}`,
		headers: headers,
	});
}

function PatchAxiosCall(endpoint, data, headers) {
	if (!data) data = {};
	if (!headers) headers = {};

	return axios({
		method: 'patch',
		url: `http://localhost:8080${endpoint}`,
		data: data,
		headers: headers,
	});
}

function DeleteAxiosCall(endpoint, data, headers) {
	if (!data) data = {};
	if (!headers) headers = {};

	return axios({
		method: 'delete',
		url: `http://localhost:8080${endpoint}`,
		data: data,
		headers: headers,
	});
}

export function SignUpApiCall(username, email, firstName, lastName, password, confirmPassword, gender) {
	const data = JSON.stringify({
		username: username,
		email: email,
		fname: firstName,
		lname: lastName,
		password: password,
		confirmPassword: confirmPassword,
		gender: gender,
	});

	return PostAxiosCall('/register', data, { 'Content-Type': 'application/json' });
}

export function LoginApiCall(username, password) {
	const data = JSON.stringify({
		username: username,
		password: password,
	});

	return PostAxiosCall('/account/login', data, {
		'Content-Type': 'application/json',
	});
}

export function SendEmail(email) {
	const data = JSON.stringify({
		email: email,
	});

	return PostAxiosCall('/account/forgotPass', data, {
		'Content-Type': 'application/json',
	});
}

export function PasswordResetWithToken(username, token, password, confirmPassword) {
	const data = JSON.stringify({
		newPassword: password,
		confirmPassword: confirmPassword,
	});
	return PostAxiosCall(`/account/resetPass/${username}/${token}`, data, {
		'Content-Type': 'application/json',
	});
}

export function IsEmailTokenValid(username, passResetToken) {
	return GetAxiosCall(`/account/resetPass/${username}/${passResetToken}`);
}

export function ChangeUserPass(authToken, oldPassword, newPassword, confirmPassword) {
	//for logged in user
	const data = JSON.stringify({
		oldPassword,
		newPassword,
		confirmPassword,
	});
	return PostAxiosCall('/account/changePass', data, { 'x-access-token': authToken });
}

export function FilterTherapists(query, therapistTitle, gender, degree, yoe, pageNumber) {
	let title = therapistTitle ? `&title=${therapistTitle}` : ''; //therapist job title (string-anything)
	let tgender = gender ? `&gender=${gender}` : ''; // 'female'/'male'
	let tdegree = degree ? `&degree=${degree}` : ''; // 'Phd' / 'Masters'
	let yearsOfExp = yoe ? `&yoe=${yoe}` : ''; // number (preferably between 0-20)
	let pageNum = pageNumber ? `&pageNum=${pageNumber}` : ''; //number (preferably between 1-maxPageNum)
	return GetAxiosCall(`/search?searchString=${query}${title}${tgender}${tdegree}${yearsOfExp}${pageNum}`);
}

export function GetFilteredTherapist(id) {
	return GetAxiosCall(`/therapist-description/${id}`);
}

export function IsVerificationTokenValid(username, emailVerificationToken) {
	return GetAxiosCall(`/account/verify/${username}/${emailVerificationToken}`);
}

export function IsUserTokenValid(authToken) {
	return GetAxiosCall('/verifyToken', { 'x-access-token': authToken });
}

export function GetUserInfo(authToken) {
	return GetAxiosCall('/user-info', { 'x-access-token': authToken });
}

export function ChangeName(fname, lname, authToken) {
	const data = JSON.stringify({
		fname,
		lname,
	});
	return PatchAxiosCall('/profile/editName', data, { 'x-access-token': authToken });
}

export function DeactivateAccount(authToken) {
	return PostAxiosCall('/account/deactivate', {}, { 'x-access-token': authToken });
}

export function StopAccountDeactivation(authToken) {
	return PostAxiosCall('/account/undeactivate', {}, { 'x-access-token': authToken });
}

export function CreateJournal(authToken, title, body) {
	const data = { title, body };
	return PostAxiosCall('/journal/create', data, { 'x-access-token': authToken });
}

export function GetUserJournals(authToken) {
	return GetAxiosCall('/journal/read', { 'x-access-token': authToken });
}

export function UpdateJournal(authToken, journalID, newTitle, newBody) {
	const data = {
		journalID,
		title: newTitle,
		body: newBody,
	};

	return PatchAxiosCall('/journal/update', data, { 'x-access-token': authToken });
}

export function DeleteJournal(journalID, authToken) {
	const data = { journalID };

	return DeleteAxiosCall('/journal/delete', data, { 'x-access-token': authToken });
}

export function ContactSupport(authToken, supportMessage) {
	//registered users
	const data = JSON.stringify({
		supportMessage,
	});

	return PostAxiosCall('/contact/user', data, { 'x-access-token': authToken });
}

export function ContactSupportExternal(fname, lname, email, supportMessage) {
	const data = JSON.stringify({
		fname: fname,
		lname: lname,
		email: email,
		supportMessage: supportMessage,
	});

	return PostAxiosCall('/contact/external', data, { 'Content-Type': 'application/json' });
}

export function CreateUserAppointment(authToken, title, description, date, repeat) {
	const data = JSON.stringify({
		title,
		description,
		date,
		repeat,
	});
	return PostAxiosCall('/calendar/create', data, { 'x-access-token': authToken });
}

export function GetUserAppointments(authToken) {
	return GetAxiosCall('/calendar/getUserAppointments', { 'x-access-token': authToken });
}

export function DeleteUserAppointment(authToken, eventID) {
	return DeleteAxiosCall(`/calendar/deleteAppointment/${eventID}`, {}, { 'x-access-token': authToken });
}

export function ModifyUserAppointment(authToken, eventID, title, description, date, repeat) {
	const data = JSON.stringify({
		title,
		description,
		date,
		repeat,
	});

	return PatchAxiosCall(`/calendar/modify/${eventID}`, data, { 'x-access-token': authToken });
}

export function UploadProfilePicture(file, authToken) {
	if (!file || file.size <= 0) {
		console.log('File is empty');
		return;
	}
	const formData = new FormData();
	formData.append('File', file);
	console.log('sending to server');
	return PostAxiosCall('/profile/setProfilePic', formData, {
		'Content-Type': 'multipart/form-data',
		'x-access-token': authToken,
	});
}

export function GetUserPicture(authToken) {
	return GetAxiosCall('/getProfilePic', { 'x-access-token': authToken });
}

export function CreateTherapistAppointment(id, title, description, date, repeat) {
	const data = JSON.stringify({
		id,
		title,
		description,
		date,
		repeat,
	});
	return PostAxiosCall('/calendar/therapist/create', data);
}

export function GetTherapistAppointments(therapistID) {
	return GetAxiosCall(`/calendar/therapist/getTherapistAppointments/${therapistID}`);
}

export function DeleteTherapistAppointment(therapistID, eventID) {
	return DeleteAxiosCall(`/calendar/therapist/${therapistID}/deleteAppointment/${eventID}`, {}, { 'x-access-token': authToken });
}
export function ModifyTherapistAppointment(therapistID, eventID, title, description, date, repeat) {
	const data = JSON.stringify({
		id: therapistID,
		title,
		description,
		date,
		repeat,
	});

	return PatchAxiosCall(`/calendar/therapist/modify/${eventID}`, data);
}

import axios from "axios";

function PostAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

    return axios({
        method: "post",
        url: `http://localhost:8080${endpoint}`,
        data: data,
        headers: headers,
    });
}

function GetAxiosCall(endpoint, headers) {
  if (!headers) headers = {};
  return axios({
    method: "get",
    url: `http://localhost:8080${endpoint}`,
    headers: headers,
  });
}

function PatchAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};

    return axios({
        method: "patch",
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
        gender: gender
    });


    return PostAxiosCall('/register', data, { "Content-Type": "application/json" });
}
export function newJournal(title, body) {
    const jdata = JSON.stringify({
        title: title,
        body: body
    });
    return PostAxiosCall('/addJournal', jdata, { 'Content-Type': "application/json" });
}

export function LoginApiCall(username, password) {
  const data = JSON.stringify({
    username: username,
    password: password,
  });

  return PostAxiosCall("/account/login", data, {
    "Content-Type": "application/json",
  });
}

export function SendEmail(email) {
  const data = JSON.stringify({
    email: email
  });

  return PostAxiosCall("/account/forgotPass", data, {
    "Content-Type": "application/json",
  });
}

export function PasswordResetWithToken(username, token, password, confirmPassword) {
  const data = JSON.stringify({
    newPassword: password,
    confirmPassword: confirmPassword
  });
  return PostAxiosCall(`/account/resetPass/${username}/${token}`, data, {
    "Content-Type": "application/json",
  });
}

export function IsEmailTokenValid(username, passResetToken) {
    return GetAxiosCall(`/account/resetPass/${username}/${passResetToken}`);
}

export function FilterTherapists(query) {
  return GetAxiosCall(`/search?searchString=${query}`);
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
    lname
  });
  return PatchAxiosCall('/profile/editName', data, { 'x-access-token': authToken });
}

export function DeactivateAccount(authToken) {
  return PostAxiosCall('/account/deactivate',{}, { 'x-access-token': authToken });
}

export function StopAccountDeactivation(authToken) {
  return PostAxiosCall('/account/undeactivate',{}, { 'x-access-token': authToken });
}
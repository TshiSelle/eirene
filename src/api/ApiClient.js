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

function GetAxiosCall(endpoint, data, headers) {
  if (!data) data = {};
  if (!headers) headers = {};
  return axios({
    method: "get",
    url: `http://localhost:8080${endpoint}`,
    headers: headers,
  });
}

export function SignUpApiCall(
  username,
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
  gender
) {
  const data = JSON.stringify({
    username: username,
    email: email,
    fname: firstName,
    lname: lastName,
    password: password,
    confirmPassword: confirmPassword,
    gender: gender,
  });

  return PostAxiosCall("/register", data, {
    "Content-Type": "application/json",
  });
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
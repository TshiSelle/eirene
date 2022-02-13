export function validateName(name, tag) {
  if (!name) return { success: false, message: `${tag} required.` };
  if (name.length >= 1024) return { success: false, message: `${tag} too long.` };
  return { success: true };
}

export function validatePassword(password) {
    if (!password) return { success: false, message: 'Password required.' };
    if (password.length < 8) return { success: false, message: 'Password too short.' };
    if (password.length >= 1024) return { success: false, message: 'Password too long.' };
    return { success: true };
}

export function validateEmail(email) {
  if (!email) return { success: false, message: 'Email required' };
  if (email.length > 254) return { success: false, message: 'Email too long.' };
  return { success: true };
}

export function validateGender(gender) {
  if (!gender || gender === 'None' || gender === 'Select an option') return { success: false, message: 'Please select a gender.' };
  if (gender === 'male' || gender === 'female') return { success: true };
  return { success: false, message: 'Invalid gender.' };
}

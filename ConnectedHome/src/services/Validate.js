export function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function required(input) {
  if (!input || input.length === 0) {
    return false;
  }
  return true;
}

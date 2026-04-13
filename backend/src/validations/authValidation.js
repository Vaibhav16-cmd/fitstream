export const validateAuthInput = ({ name, email, password }) => {
  const errors = [];

  if (!email || !email.includes("@")) {
    errors.push("A valid email is required.");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long.");
  }

  if (name !== undefined && !name.trim()) {
    errors.push("Name cannot be empty.");
  }

  return errors;
};

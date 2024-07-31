const bcrypt = require("bcryptjs");

const password = "12345"; // The plain text password
const hashedPassword =
  "$2a$10$zomLnJOsMSHIVu26t75YbetCxL.IbV1ode3TANcnVZgGNjbPlKEkq"; // Replace with the new hash

bcrypt.compare(password, hashedPassword, (err, isMatch) => {
  if (err) throw err;
  console.log(isMatch); // Should print `true` if the password matches
});

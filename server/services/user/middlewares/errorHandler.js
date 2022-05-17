function errorHandler (err, req, res, next) {
  let code, messages;

  switch (err.name) {
    case "EmailNotValid":
      code = 400;
      messages = "Email is not valid"
      break;
    case "InvalidToken":
      code = 400;
      messages = "Invalid token";
      break;
    case "MissingAccessToken":
      code = 400;
      messages = "Missing access token";
      break;
    case "EmailIsUsed":
      code = 400;
      messages = "Email has been used by other user";
      break;
    case "LoginBadRequest":
      code = 400;
      messages = "Invalid email/password";
      break;
    case "RegisterBadRequest":
      code = 400;
      messages = "Please fill in all fields";
      break;
    case "Forbidden":
      code = 403;
      messages = "You cannot do that"
      break;
    default:
      code = 500;
      messages = ["Internal Server Error"];
      break;
  }

  res.status(code).json({ message: messages });
}

module.exports = errorHandler;
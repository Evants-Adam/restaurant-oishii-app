function errorHandler (error, req, res, next) {
  let code, messages;
  
  switch (error.name) {
    case "SequelizeValidationError":
      code = 400;
      messages = error.errors.map((er) => {
        return er.message;
      })
      break;
    case "SequelizeUniqueConstraintError":
      code = 400;
      messages = "Email is already used by other users";
      break;
    case "LoginBadRequest":
      code = 401;
      messages = "Invalid Email/Password"
      break;
    case "MissingAccessToken":
      code = 400;
      messages = "Missing Access Token"
      break;
    case "QuantityNotFound":
      code = 400;
      messages = "Quantity minimum 1"
      break;
    case "StatusNotValid":
      code = 400;
      messages = "Status Not Valid"
      break;
    case "PostRecipeBadRequest":
      code = 400;
      messages = "Ingredient/Measurement is required"
      break;
    case "QuantityBadRequest":
      code = 400;
      messages = "Quantity is not valid"
      break;
    case "InvalidToken": 
      code = 401;
      messages = "Invalid Token"
      break;
    case "CannotDeleteMenu":
      code = 401;
      messages = "Cannot Delete Menu, There are orders for that menu"
      break;
    case "JsonWebTokenError":
      code = 401;
      messages = "Invalid Token"
      break;
    case "MeasurementNotFound":
      code = 404;
      messages = "Measurement Not Found"
      break;
    case "MenuNotFound":
      code = 404;
      messages = "Menu Not Found"
      break;
    case "OrderNotFound":
      code = 404;
      messages = "Order Not Found"
      break;
    case "IngredientNotFound":
      code = 404;
      messages = "Ingredient Not Found"
      break;
    case "RecipeNotFound":
      code = 404;
      messages = "Recipe Not Found"
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
  console.log(error)

  res.status(code).json({ message: messages });
}

module.exports = errorHandler;
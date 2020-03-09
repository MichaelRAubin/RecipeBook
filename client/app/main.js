import { AuthController } from "./auth/AuthController.js";
import { resource } from "./resource.js";
import RecipesController from "./controllers/RecipesController.js";


class App {
  authController = new AuthController();
  recipesController = new RecipesController();
}

/**
 * FIXME 
 * fix like should not be owner manditory - completed
 * filter to show only the recipes I created - completed
 * hide icons if not logged in - completed
 */


window["app"] = new App();

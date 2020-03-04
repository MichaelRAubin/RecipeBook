import store from "../store.js";
import Recipe from "../Models/Recipe.js";
import { resource } from "../resource.js";


//const _SANDBOX_URL = "https://recipebook-api.com/api/recipes";
class RecipesService {
    async getRecipes() {
        let recipes = await resource.get("api/recipes");
        recipes = recipes.map(r => new Recipe(r));
        store.commit("recipes", recipes);
    }

    async activeRecipe(id) {
        let selectRecipe = await store.State.recipes.find(r => r._id == id)
        store.State.activeRecipe = selectRecipe;
    }

    async create(recipeData) {
        let recipe = await resource.post("api/recipes", recipeData);
        recipe = new Recipe(recipeData);
        store.State.recipes.push(recipe);
        store.commit("recipes", store.State.recipes);
    }

    async editRecipe(recipeData) { //TODO getting not defined here
        debugger
        let recipe = await resource.put("api/recipes" + recipeData._id);
        recipe = new Recipe(recipeData);
        let i = store.State.recipes.findIndex(r => r._id == recipe._id)
        if (i != -1) {
            store.State.recipes.splice(i, 1, recipe)
            store.commit("recipes", store.State.recipes);
        }
    }

}
// Singleton Services
const service = new RecipesService();
export default service;
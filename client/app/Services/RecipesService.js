import store from "../store.js";
import Recipe from "../Models/Recipe.js";
import { resource } from "../resource.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";



class RecipesService {

    async likeRecipe(recipeData) {
        recipeData.like++
        let recipe = await resource.put("api/recipes/" + recipeData._id, recipeData);
        recipe = new Recipe(recipe);
        let i = store.State.recipes.findIndex(r => r._id == recipe._id)
        if (i != -1) {
            store.State.recipes.splice(i, 1, recipe)
            store.commit("recipes", store.State.recipes);
        }

    }

    async getRecipesByCreatorId(creatorId) {
        let myRecipes = await store.State.recipes.filter(r => r.creatorId == creatorId)
        store.State.myRecipes = myRecipes.map(recipeData => new Recipe(recipeData));
        console.log("My Recipes", myRecipes)

    }

    async deleteRecipe(recipeData) {
        recipeData.closed = true
        await this.editRecipe(recipeData)
    }

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
        recipe = new Recipe(recipe);
        store.State.recipes.push(recipe);
        store.commit("recipes", store.State.recipes);
    }

    async editRecipe(recipeData) {
        let recipe = await resource.put("api/recipes/" + recipeData._id, recipeData);
        recipe = new Recipe(recipe);
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
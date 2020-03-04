import recipesService from "../Services/RecipesService.js";
import store from "../store.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";

//Private
function _draw() {
    let template = "";
    store.State.recipes.forEach(recipe => (template += recipe.Template));
    document.getElementById("recipe-listings").innerHTML = template;
}

function _drawActiveRecipe() {
    if (!store.State.activeRecipe._id) {
        document.getElementById("activeRecipe").innerHTML = "";
        return;
    }
    document.getElementById("activeRecipe").innerHTML =
        store.State.activeRecipe.activeRecipeTemplate;
}
//Public
export default class RecipesController {
    constructor() {
        Auth0Provider.onAuth(this.getRecipes)
        store.subscribe("recipes", _draw);
    }

    async getRecipes() {
        try {
            await recipesService.getRecipes();
        } catch (error) {
            console.log(error);
        }
    }

    async create() {
        event.preventDefault();
        let form = event.target;
        try {
            // @ts-ignore
            await recipesService.create({
                // @ts-ignore
                name: form.name.value,
                // @ts-ignore
                description: form.description.value,
                // @ts-ignore
                //ingredients: form.ingredients.value.split(","),  //TODO need to fix - breaks form submission
                // @ts-ignore
                directions: form.directions.value,
                // @ts-ignore
                imgUrl: form.imgUrl.value
            });
            // @ts-ignore
            form.reset();
        } catch (error) {
            console.log(error)
        }
    }

    async editRecipe(id) {
        let recipe = store.State.recipes.find(r => r._id == id);
        let form = document.getElementById("update-form");
        // @ts-ignore
        form.name.value = recipe.name;
        // @ts-ignore
        form.description.value = recipe.description;
        // @ts-ignore
        form.ingredients.value = recipe.ingredients;
        // @ts-ignore
        form.imgUrl.value = recipe.imgUrl;
        // @ts-ignore
        form._id.value = recipe._id;
    }

    async updateRecipe() {
        try {
            await this.editRecipe();
            await recipesService.editRecipe();
        } catch (error) {
            console.log(error)
        }
    }

    /**
   * 
   * @param {string} _id
   */
    async activeRecipe(_id) {
        try {
            await recipesService.activeRecipe(_id);
            _drawActiveRecipe();
        } catch (error) {
            console.error(error);
        }
    }
}

import recipesService from "../Services/RecipesService.js";
import store from "../store.js";
import { Auth0Provider } from "../auth/Auth0Provider.js";

//Private
function _draw() {
    let template = "";
    store.State.recipes.forEach(recipe => (template += recipe.Template));
    document.getElementById("recipe-listings").innerHTML = template;
}

function _drawMyRecipes() {
    let template = "";
    store.State.myRecipes.forEach(recipe => (template += recipe.Template));
    document.getElementById("recipe-listings").innerHTML = template;
}

function _drawActiveRecipe() {
    if (!store.State.activeRecipe._id) {
        document.getElementById("activeRecipe").innerHTML = "";
        return;
    }
    else if (!Auth0Provider.userInfo.sub) {
        document.getElementById("activeRecipe").innerHTML =
            store.State.activeRecipe.activeRecipeTemplateNotLoggedIn;
        return;
    }
    else {
        document.getElementById("activeRecipe").innerHTML =
            store.State.activeRecipe.activeRecipeTemplateLoggedIn;
        return;
    }
}
//Public
export default class RecipesController {
    constructor() {
        this.getRecipes();
        store.subscribe("recipes", _draw);
    }

    async getRecipes() {
        try {
            await recipesService.getRecipes();
        } catch (error) {
            console.log(error);
        }
    }

    async getRecipesByCreatorId() {
        try {
            let creatorId = Auth0Provider.userInfo.sub;
            await recipesService.getRecipesByCreatorId(creatorId)
            _drawMyRecipes()
        } catch (error) {
            console.log(error)
        }
    }

    async create() {
        event.preventDefault();
        let form = event.target;
        let recipeData = this.getFormData(form)
        try {
            // @ts-ignore
            await recipesService.create(recipeData);
            // @ts-ignore
            form.reset();
        } catch (error) {
            console.log(error)
        }
    }
    getFormData(form) {
        return {
            // @ts-ignore
            name: form.name.value,
            // @ts-ignore
            description: form.description.value,
            // @ts-ignore
            ingredients: form.ingredients.value.split(","),  //TODO need to fix - breaks form submission
            // @ts-ignore
            directions: form.directions.value,
            // @ts-ignore
            imgUrl: form.imgUrl.value
        };
    }

    async likeRecipe(_id) {
        try {
            //Auth0Provider.userInfo.sub = "";
            let recipeData = store.State.recipes.find(r => r._id == _id)
            await recipesService.likeRecipe(recipeData)
            _drawActiveRecipe();
        } catch (error) {
            console.log(error)
        }
    }

    async deleteRecipe(_id) {
        try {
            let recipeData = store.State.recipes.find(r => r._id == _id)
            await recipesService.deleteRecipe(recipeData)
            _draw()
        } catch (error) {
            console.log(error)
        }
    }

    async editRecipe(_id) {

        let recipe = store.State.recipes.find(r => r._id == _id);
        let form = document.getElementById("update-form");
        this.setFormFields(form, recipe)
    }
    setFormFields(form, recipe) {
        form.name.value = recipe.name;
        form.description.value = recipe.description;
        form.ingredients.value = recipe.ingredients.join(", ");
        form.directions.value = recipe.directions;
        form.imgUrl.value = recipe.imgUrl;
        form._id.value = recipe._id;
    }

    async updateRecipe() {
        try {
            event.preventDefault()
            let form = document.getElementById("update-form");
            let recipeData = this.getFormData(form)
            // @ts-ignore
            recipeData._id = form._id.value;
            await recipesService.editRecipe(recipeData)
            _drawActiveRecipe();
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

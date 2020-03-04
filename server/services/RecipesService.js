import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";
import Recipe from "../models/Recipe";

class RecipesService {
    async getAll(query = {}) {
        let recipes = await dbContext.Recipe.find(query);
        return recipes;
    }
    async getById(id) {
        let recipe = await dbContext.Recipe.findById(id);
        if (!recipe) {
            throw new BadRequest("Invalid Id");
        }
        return recipe;
    }
    async create(recipeData) {
        return await dbContext.Recipe.create(recipeData)
    }
    async editRecipe(_id, updateData) {
        let recipe = await this.getById(_id)
        // @ts-ignore
        //if (!id || recipe.closed || !creatorId) {
        //   throw new BadRequest("Recipe can not be updated")
        // }
        return await dbContext.Recipe.findByIdAndUpdate(_id, updateData, {
            new: true
        });
    }
    async deleteRecipe(_id) {
        // @ts-ignore
        return await dbContext.Recipe.findByIdAndUpdate(_id, {
            closed: true, new: true,
        });
    }
}

export const recipesService = new RecipesService();

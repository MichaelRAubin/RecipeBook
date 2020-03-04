import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

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
    async editRecipe(id, updateData) {
        let recipe = await dbContext.Recipe.findById(id, updateData)
        // @ts-ignore
        if (recipe.closed || !creatorId) {
            throw new BadRequest("Recipe deleted and cannot be edited")
        }
        return await dbContext.Recipe.findByIdAndUpdate(id, updateData, {
            new: true
        });
    }
    async deleteRecipe(id) {
        return await dbContext.Recipe.findByIdAndUpdate(id, {
            closed: true, new: true,
        });
    }
}

export const recipesService = new RecipesService();

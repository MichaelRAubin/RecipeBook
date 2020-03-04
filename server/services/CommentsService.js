import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
    async getAll(query = {}) {
        let comment = await dbContext.Comment.find(query);
        return comment;
    }
    //TODO not currently working - need to fix
    async getCommentsByRecipeId(recipeId) {
        if (!recipeId) {
            throw new BadRequest("Invalid Recipe Id");
        }
        return await dbContext.Comment.find({ recipeId });
    }

    async create(commentData) {
        return await dbContext.Comment.create(commentData)
    }
}

export const commentsService = new CommentsService();
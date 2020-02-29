import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
    async find(query = {}) {
        let comment = await dbContext.Comment.find(query);
        return comment;
    }
    async findById(id) {
        let comment = await dbContext.Comment.findById(id);
        if (!comment) {
            throw new BadRequest("Invalid Id");
        }
        return comment;
    }
}

export const commentsService = new CommentsService();
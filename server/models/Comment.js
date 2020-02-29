import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Comment = new Schema(
    {
        description: [{ type: String, required: true }],
        creatorId: { type: String },
        createdBy: { type: String },
        creatorImage: { type: String },
        recipeId: { type: ObjectId, ref: "Recipe", required: true },
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

export default Comment;
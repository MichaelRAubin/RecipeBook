import mongoose from "mongoose";
const Schema = mongoose.Schema;


const Recipe = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        ingredients: [{ type: String }],
        directions: { type: String },
        createdBy: { type: String },
        creatorId: { type: String },
        creatorImage: { type: String },
        closed: { type: Boolean, default: false },
        like: { type: Number, default: 0 },
        imgUrl: { type: String },
        id: { type: String }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

export default Recipe;
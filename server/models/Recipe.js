import mongoose from "mongoose";
const Schema = mongoose.Schema;


const recipe = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        ingredients: [{ type: String }],
        createdBy: { type: String },
        creatorId: { type: String },
        creatorImage: { type: String },
        closed: { type: Boolean, default: false },
        like: { type: Number, default: 0 }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

export default recipe;
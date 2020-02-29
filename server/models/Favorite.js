import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Favorite = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

export default Favorite;

//TODO need to make many to many
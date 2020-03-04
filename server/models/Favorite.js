import mongoose from "mongoose";
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const Favorite = new Schema(
    {
        favorite: { type: Boolean, default: false },
        id: { type: ObjectId, ref: "Recipe", required: true },
        sub: { type: ObjectId, ref: "Profile", required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
);

export default Favorite;

//TODO need to make many to many
import express from "express";
import BaseController from "../utils/BaseController";
import { commentsService } from "../services/CommentsService";
import auth0Provider from "@bcwdev/auth0Provider";

export class CommentsController extends BaseController {
    constructor() {
        super("api/comments");
        this.router = express
            .Router()
            .get("", this.getCommentsByRecipeId)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0Provider.getAuthorizedUserInfo)
            .post("", this.create);
    }
    async getAll(req, res, next) {
        try {
            let data = await commentsService.getAll();
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }
    //TODO not currently working - need to fix
    async getCommentsByRecipeId(req, res, next) {
        try {
            let comments = await commentsService.getCommentsByRecipeId(
                req.query.recipeId
            );
            res.send(comments);
        } catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
            req.body.creatorId = req.user.sub;
            req.body.createdBy = req.userInfo.nickname;
            req.body.creatorImage = req.userInfo.picture;
            let comment = await commentsService.create(req.body)
            res.send(comment);
        } catch (error) {
            next(error);
        }
    }
}
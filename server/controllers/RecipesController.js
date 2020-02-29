import express from "express";
import BaseController from "../utils/BaseController";
import { recipesService } from "../services/RecipesService";
import auth0Provider from "@bcwdev/auth0Provider";

export class RecipesController extends BaseController {
    constructor() {
        super("api/recipes");
        this.router = express
            .Router()
            .get("", this.getAll)
            // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
            .use(auth0Provider.getAuthorizedUserInfo)
            .get("/:id", this.getById)
            .post("", this.create)
            .put("/:id", this.editRecipe)
            .delete("/:id", this.deleteRecipe);
    }
    async getAll(req, res, next) {
        try {
            let data = await recipesService.getAll();
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }

    async getById(req, res, next) {
        try {
            let data = await recipesService.getById(req.params.id);
            return res.send(data);
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
            let recipe = await recipesService.create(req.body);
            res.send(recipe);
        } catch (error) {
            next(error);
        }
    }

    async editRecipe(req, res, next) {
        try {
            req.body.creatorId = req.user.sub;
            let editedRecipe = await recipesService.editRecipe(req.params.id, req.body);
            res.send(editedRecipe)

        } catch (error) {
            next(error);
        }
    }

    async deleteRecipe(req, res, next) {
        try {
            req.body.creatorId = req.user.sub;
            let deleteRecipe = await recipesService.deleteRecipe(req.params.id);
            res.send(deleteRecipe)
        } catch (error) {
            next(error)
        }
    }
}

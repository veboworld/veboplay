import { Router } from "express";
import { HomeController } from "../controllers/HomeController";
import { SearchController } from "../controllers/SearchController";

const routes = Router();

routes.get('/', HomeController.index);
routes.get('/api/v1/search', SearchController.index);

export default routes;
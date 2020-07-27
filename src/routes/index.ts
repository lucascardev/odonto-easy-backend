import { Router } from "express";

import ClinicController from "../controllers/ClinicControllers/ClinicController";
const routes = Router();

routes.get("/clinic/list", ClinicController.index);
routes.post("/clinic/new", ClinicController.store);

export default routes;

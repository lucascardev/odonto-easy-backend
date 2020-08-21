import { Router } from "express";

import ClinicController from "../controllers/Clinics/ClinicControllers/ClinicController";
import ChairController from "../controllers/Clinics/ClinicControllers/ChairController"
import LegalResponsibleController from "../controllers/Clinics/ClinicControllers/LegalResponsibleController"
import TechnicalManagerController from "../controllers/Clinics/ClinicControllers/TechnicalManagerController"

import ScheduleController from "../controllers/Clinics/ScheduleControllers/ScheduleController"

import DentistController from "../controllers/Clinics/DentistControllers/DentistController"

import EmployerController from "../controllers/Clinics/EmployerControllers/EmployerController"

import PatientController from "../controllers/Clinics/PatientsControllers/PatientController"
import AnamnesisController from "../controllers/Clinics/PatientsControllers/DocumentsControllers/Records/AnamnesisController"

const routes = Router();

routes.get("/clinic/list", ClinicController.index);
routes.post("/clinic/new", ClinicController.store);
routes.get("/clinic/chairs/list", ChairController.index)
routes.get("/clinic/legal_responsible/show", LegalResponsibleController.index)
routes.post("/clinic/legal_responsible/new", LegalResponsibleController.store)
routes.get("/clinic/technical_manager/show", TechnicalManagerController.index)
routes.post("/clinic/technical_manager/new", TechnicalManagerController.store)

routes.get("/clinic/scheduled/list", ScheduleController.index)
routes.post("/clinic/scheduling/new", ScheduleController.store)

routes.get("/clinic/dentists/list", DentistController.index)
routes.post("/clinic/dentists/new", DentistController.store)

routes.get("/clinic/employees/list", EmployerController.index)

routes.get("/clinic/patients/list", PatientController.index)
routes.post("/clinic/patients/new", PatientController.store)
routes.post("/clinic/patients/documents/questionnaires/anamnesis/new", AnamnesisController.store)


export default routes;

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


class PatientController {
    public async index(req: Request, res: Response): Promise<Response> {
        const patients = await prisma.patient.findMany();
        return res.status(200).json(patients);

    }
}

export default new PatientController();
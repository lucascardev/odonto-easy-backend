import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class DentistController {
  public async index(req: Request, res: Response): Promise<Response> {
    const dentists = await prisma.dentist.findMany();
    return res.status(200).json(dentists);
  }
}

export default new DentistController();
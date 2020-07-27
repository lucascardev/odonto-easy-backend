import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

interface ReqBody {
  ClinicId: string;
}

class TechnicalManager {
  public async index(req: Request, res: Response): Promise<Response> {
    const { ClinicId }: ReqBody = req.body;
    const ClinicTechnicalManager = await prisma.technicalmanager.findMany({
      where: {
        clinic_id: {
          equals: ClinicId,
        },
      },
    });

    return res.status(200).json(ClinicTechnicalManager);
  }
}

export default new TechnicalManager();

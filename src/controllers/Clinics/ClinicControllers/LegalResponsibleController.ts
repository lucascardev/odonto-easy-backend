import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

interface ReqBody {
  ClinicId: string;
}

class LegalResponsible {
  public async index(req: Request, res: Response): Promise<Response> {
    const { ClinicId }: ReqBody = req.body;
    const ClinicLegalResponsible = await prisma.legalresponsible.findMany({
      where: {
        clinic_id: {
          equals: ClinicId,
        },
      },
    });
    return res.status(200).json(ClinicLegalResponsible);
  }
}

export default new LegalResponsible();

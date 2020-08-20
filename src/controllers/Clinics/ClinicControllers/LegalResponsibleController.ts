import { PrismaClient, Legalresponsible } from "@prisma/client";
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
  public async store(req: Request, res: Response): Promise<Response>{
  const {cpf, ClinicId, fullname, contactmeans}: Legalresponsible & ReqBody = req.body
  const newLegalResponsible = await prisma.legalresponsible.create({
    data: {
      cpf: cpf,
      fullname: fullname,
      contactmeans: contactmeans,
      clinic: {
        connect: {
          registered_id: ClinicId
        }
      }
    }
  })
  const newLog = await prisma.logs.create({
    data: {
      clinic : {
        connect : {
          registered_id : ClinicId
        }
      },
       description: "Legal responsible "+fullname+ " with cpf number:"+ cpf + "was registered" 
    }
  })
  return res.status(201).send("Clinic LR registered successfully").json({response: "LR registered successfully", TM: newLegalResponsible});
  }
}

export default new LegalResponsible();

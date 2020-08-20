import { PrismaClient, Technicalmanager } from "@prisma/client";
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
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      fullname,
      cpf,
      contactmeans,
      ClinicId,
    }: Technicalmanager & ReqBody = req.body;
    const newTechnicalManager = await prisma.technicalmanager.create({
      data: {
        fullname: fullname,
        cpf: cpf,
        contactmeans: contactmeans,
        clinic: {
          connect: {
            registered_id: ClinicId,
          },
        },
      },
    });
    const newLog = await prisma.logs.create({
      data: {
        clinic : {
          connect : {
            registered_id : ClinicId
          }
        },
         description: "Technical manager "+fullname+ " with cpf number:"+ cpf + "was registered" 
      }
    })
    return res.status(201).send("Clinic TM registered successfully").json({response: "TM registered successfully", TM: newTechnicalManager});
  }
}

export default new TechnicalManager();

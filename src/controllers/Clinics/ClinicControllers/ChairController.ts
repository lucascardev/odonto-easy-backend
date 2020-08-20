import { PrismaClient, Chairs } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

interface ReqBody {
  ClinicId: string;
  userId: string;
}

class ChairController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { ClinicId }: ReqBody = req.body;
    const ClinicChairs = await prisma.chairs.findMany({
      where: {
        clinic_id: {
          equals: ClinicId,
        },
      },
    });
    return res.status(200).json(ClinicChairs);
  }

  public async store(req: Request, res: Response) : Promise<Response> {
       const {name, ClinicId, userId}: Chairs & ReqBody = req.body
    const newChair = await prisma.chairs.create({
      data: {
        name: name,
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
         description: "Chair of id " + newChair.id +"registered by user: " + userId  
      }
    })
    return res.status(201).send("New chair registered").json({response: "Chair "+name+" registered", chair: newChair});
  }

}

export default new ChairController();

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


interface ReqBody {
    ClinicId: string;
  }
class EmployerController {
    public async index(req: Request, res: Response): Promise<Response> {
     const { ClinicId }: ReqBody = req.body;
      const ClinicEmployees = await prisma.employer.findMany({
          where: {
              clinic_id: {
                  equals: ClinicId
              }
          }
      });
      return res.status(200).json(ClinicEmployees);
    }
  }
  
  export default new EmployerController();
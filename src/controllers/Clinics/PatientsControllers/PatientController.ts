import { Request, Response } from "express";
import { PrismaClient, Patient } from "@prisma/client";
const prisma = new PrismaClient();

interface ReqBody {
    ClinicId: string;
    email: string | null
  }

class PatientController {
    public async index(req: Request, res: Response): Promise<Response> {
         const { ClinicId }: ReqBody = req.body;
        const patients = await prisma.patient.findMany({
            where: {
                clinic_id: {
                    equals: ClinicId,
                },
            },
        });
        return res.status(200).json(patients);
    }

    public async create(req:Request, res:Response): Promise<Response> {
        const {ClinicId, }: Patient & ReqBody = req.body
        
        const clinicInformation = await prisma.clinic_finance_options.findOne({
          where: {
            id: ClinicId
          }
        })
        const newPatient = await prisma.patient.create({
          data: {
           birth_date,
           age,
           fullname,
           password,
           gender,
           last_visit_dentist,
           clinic_prontuary_number,
           clinic: {
               connect: {
                   registered_id: ClinicId
               }
           }
          }
        })
        return res.status(201).send("New dentist registered successfully").json({response: "New dentist registered successfully", newDentist});
      }
}

export default new PatientController();
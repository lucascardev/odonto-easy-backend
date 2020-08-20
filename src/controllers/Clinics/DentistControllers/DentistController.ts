import { Request, Response } from "express";
import { PrismaClient, Dentist } from "@prisma/client";
const prisma = new PrismaClient();

interface ReqBody {
  ClinicId: string;
  email: string | null
}
class DentistController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { ClinicId }: ReqBody = req.body;
    const dentists = await prisma.dentist.findMany({
      where: {
        clinic_id: {
          equals: ClinicId,
        },
      },
    });
    return res.status(200).json(dentists);
  }

  public async store(req:Request, res:Response): Promise<Response> {
    const {CRO_number, firstname, lastname, commission, contactmeans, email, cellphone_number, ClinicId }: Dentist & ReqBody = req.body
    
    const clinicInformation = await prisma.clinic_finance_options.findOne({
      where: {
        id: ClinicId
      }
    })
    console.log(clinicInformation);
    const newDentist = await prisma.dentist.create({
      data: {
        CRO_number: CRO_number,
        firstname: firstname,
        lastname: lastname,
        commission: commission || clinicInformation.commission_template,
        cellphone_number: cellphone_number,
        contactmeans: contactmeans,
        clinic: {
          connect: {
            registered_id: ClinicId
          }
        },
        email: {
          create: {
            email: email
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
         description: "Dr."+firstname+lastname+ "with CRO number"+ CRO_number + "was registered" 
      }
    })
    return res.status(201).json({response: "New dentist registered successfully", dentist: newDentist});
  }
}

export default new DentistController();

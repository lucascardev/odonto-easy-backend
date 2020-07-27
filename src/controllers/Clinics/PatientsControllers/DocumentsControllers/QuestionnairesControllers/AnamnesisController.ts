import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface ReqBody {
  patientId: string | null;
}

class AnamnesisController {
  public async store(req: Request, res: Response): Promise<Response> {
    const { patientId }: ReqBody = req.body;
    const PatientInformation = await prisma.patient.findOne({
      where: {
        id: patientId,
      },
      include: {
        treatment_evolution: {
          orderBy: {
            date: "asc",
          },
          select: {
            id: true,
            date: true,
            hour: true,
            dentist_id: true,
          },
          include: {
            treatment: {
              select: {
                procedures_id: true,
              },
            },
          },
        },
      },
    });
    const {
      dentist_id,
      date,
      hour,
      id,
      treatment,
    } = PatientInformation.treatment_evolution[0];
    const newAnamnesis = await prisma.anamnesis.create({
      data: {
        last_dentist_visit: PatientInformation.last_visit_dentist,
        last_procedure: date,
        what_was_done: treatment[0].procedures_id,
        patient: {
          connect: {
            id: patientId,
          },
        },
      },
    });
    return res.status(201).send("medical record created");
  }
}

export default new AnamnesisController();

import { Request, Response } from "express";
import crypto from "crypto";
import { PrismaClient, Patient, Clinic } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

interface ReqBody {
  ClinicId: string;
  email: string | null;
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

  public async store(req: Request, res: Response): Promise<Response> {
    const {
      ClinicId,
      birth_date,
      fullname,
      gender,
      brazilian_cpf,
      brazilian_rg,
      socialreason,
      contactmeans,
      cellphone_number,
      cnpj
    }: Patient & ReqBody & Clinic = req.body;
    const clinicRecordNumber = await prisma.patient.count({
      where: {
        clinic_id: {
          equals: ClinicId,
        },
      },
    });
    const newClinicRecordNumber = clinicRecordNumber + 1;

    async function patientAge(bd: Date) {
      const patientBirthYear = moment(bd).get("y");
      const patientBirthMonth = moment(bd).get("M");
      const patientBirthDay = moment(bd).get("D");
      const currentYear = moment().get("y");
      const currentMonth = moment().get("M");
      const currentDay = moment().get("D");
      var currentPatientAge = 0;
      if (patientBirthMonth < currentMonth) {
        currentPatientAge = currentYear - patientBirthYear;
      } else if (
        patientBirthMonth == currentMonth &&
        patientBirthDay <= currentDay
      ) {
        currentPatientAge = currentYear - patientBirthYear;
      } else {
        currentPatientAge = currentYear - patientBirthYear - 1;
      }
      return currentPatientAge;
    }

    const currentPatientAge = await patientAge(birth_date);
    const dateFormatted = new Date(moment(birth_date).format());
    const password = crypto.randomBytes(3).toString('hex');
   
    // const clinicInformation = await prisma.clinic_finance_options.findOne({
    //   where: {
    //     id: ClinicId,
    //   },
    // });
    const newPatient = await prisma.patient.create({
      data: {
        birth_date: dateFormatted,
        age: currentPatientAge,
        fullname: fullname,
        password: password,
        gender: gender,
        cellphone_number: cellphone_number,
        contactmeans: contactmeans,
        brazilian_cpf: brazilian_cpf,
        brazilian_rg: brazilian_rg,
        last_visit_dentist: new Date(moment().format()),
        clinic_registry_number: newClinicRecordNumber,
        clinic: {
          connect: {
            registered_id: ClinicId,
            socialreason_cnpj: {
              cnpj: cnpj,
              socialreason: socialreason
            }
          },
        },
      },
    });
    const newLog = await prisma.logs.create({
      data: {
        clinic: {
          connect: {
            registered_id: ClinicId,
            socialreason_cnpj: {
              cnpj: cnpj,
              socialreason: socialreason
            }
          },
        },
        description:
          "Patient " +
          fullname +
          " with document number was registered.",
      },
    });
    return res.status(201).json({
      response: "New patient registered successfully",
      patient: newPatient,
    });
  }
}

export default new PatientController();

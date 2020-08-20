import { PrismaClient, Schedule, Patient } from "@prisma/client";
import crypto from "crypto";
import { Request, Response } from "express";
import moment from "moment";
const prisma = new PrismaClient();

class ScheduleController {
    public async index(req: Request, res: Response): Promise<Response> {
    // const { clinic_id, date, hour, minutes, dentist_id, patient_id }:Schedule = req.body;
      
      const allSchedules = await prisma.schedule.findMany({
          where: {
           date: {
              gt: new Date(moment().format()) 
           }
          }
      });
      return res.status(200).json(allSchedules);
    }

    public async store(req: Request, res: Response): Promise<Response> { 

        const { clinic_id, date, hour, minutes, dentist_id, patient_id, birth_date, gender, fullname }:Schedule & Patient = req.body;
       
        const clinicRecordNumber = await prisma.patient.count({
            where: {
              clinic_id: {
                equals: clinic_id,
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

        const scheduling = await prisma.schedule.create({
            data: {
               clinic: {
                   connect: {
                       registered_id: clinic_id
                   }
               },
               date: date,
               dentist: {
                   connect: {
                       id: dentist_id
                   }
               },
               hour: hour,
               minutes: minutes,
               treatment_evolution: {
                   create: {
                      dentist: {
                          connect: {
                              id: dentist_id
                          }
                      },
                      patient: {
                        connectOrCreate: {
                            where: {
                                id: patient_id
                            },
                            create: {
                                fullname: fullname,
                                birth_date: dateFormatted,
                                age: currentPatientAge,
                                clinic: {
                                    connect: {
                                        registered_id: clinic_id
                                    }
                                },
                                gender: gender,
                                last_visit_dentist: new Date(moment().format()),
                                clinic_registry_number: newClinicRecordNumber,
                                password: password
                            }
                        }
                      }
                   }
               }

            }
        });
        return res.status(200).json(scheduling);
    }
  }

  export default new ScheduleController();
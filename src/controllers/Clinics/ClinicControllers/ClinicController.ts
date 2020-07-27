import { Request, Response } from "express";
import { PrismaClient, Payment_method } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();

interface ReqBody {
  cnpj: string;
  fantasy_name: string;
  socialreason: string;
  payment_method: Payment_method;
  registered_credit_card?: boolean;
  registered_debit_card?: boolean;
  credit_card_number?: string;
  credit_card_CCV?: string;
  credit_card_name?: string;
  debit_card_number?: string;
  debit_card_CCV?: string;
  debit_card_name?: string;
  payment_day?: number;
}

class ClinicController {
  public async index(req: Request, res: Response): Promise<Response> {
    const clinics = await prisma.clinic.findMany();
    return res.status(200).json(clinics);
  }
  public async store(req: Request, res: Response): Promise<Response> {
    const {
      cnpj,
      fantasy_name,
      socialreason,
      payment_method,
      registered_credit_card,
      registered_debit_card,
      credit_card_number,
      credit_card_CCV,
      credit_card_name,
      debit_card_number,
      debit_card_CCV,
      debit_card_name,
      payment_day,
    }: ReqBody = req.body;
    const actually_date = moment(new Date());
    const actually_year = actually_date.year();
    const actually_month = actually_date.month();
    const next_payment_date = moment([actually_year, actually_month, payment_day, 10])
    .add(1, "month").toISOString();
    console.log("sended, date: "+actually_date+" month: "+ actually_month+" year: " + actually_year + " day: "+ payment_day)
    console.log("next payment is: " + next_payment_date);
    const new_clinic = await prisma.clinic.create({
      data: {
        cnpj: cnpj,
        fantasy_name: fantasy_name,
        socialreason: socialreason,
        Clinic_payment_information: {
          create: {
            payment_method: payment_method,
            payment_day: payment_day,
            next_payment: next_payment_date,
            registered_credit_card: registered_credit_card,
            registered_debit_card: registered_debit_card,
            credit_card_number: credit_card_number,
            credit_card_name: credit_card_name,
            credit_card_CCV: credit_card_CCV,
            debit_card_name: debit_card_name,
            debit_card_number: debit_card_number,
            debit_card_CCV: debit_card_CCV
          }
        },
        logs: {
          create: {
            description:
              "Clinic registry was created with cnpj, " +
              cnpj +
              " and the social reason of " +
              socialreason +
              "."
          }
        }
      }
    });
    return res.status(201).send("You are registered now");
  }
}
export default new ClinicController();

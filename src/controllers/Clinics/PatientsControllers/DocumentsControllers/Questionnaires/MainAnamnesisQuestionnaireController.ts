import { Request, Response } from "express";
import { PrismaClient, Main_anamnesis_questionnaire } from "@prisma/client";
import moment from "moment";
const prisma = new PrismaClient();


class MainAnamnesisQuestionnaire {
  public async index(req: Request, res:Response): Promise<Response>{
    const { anamnesis_prontuary_id } = req.params
    const PatientQuestionnaire = await prisma.main_anamnesis_questionnaire.findOne({
        where: {
          anamnesis_prontuary_id: anamnesis_prontuary_id
        }
    })
    return res.json(PatientQuestionnaire)
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const {
      allergic_to_any_medicine,
      allergic_to_latex,
      already_used_local_anestesics,
      you_presented_reaction,
      any_heart_problems,
      if_yes_what_hearth_problem,
      are_breastfeeding,
      arterial_hypertension,
      if_yes_any_treatment_for_hypertension,
      breathing_problems,
      if_yes_what_breathing_problem,
      consider_a_alcolic_addicted,
      diabetes_mellitus,
      if_yes_any_treatment_for_diabetes,
      entered_the_process_of_menopause,
      if_yes_guided_by_the_gynecologist,
      family_background,
      if_yes_what_familys_problems,
      gastric_problems,
      if_yes_what_gastric_problems,
      if_yes_you_looked_for_gastric_doctor,
      joints_problems_or_reumatics,
      if_yes_you_looked_for_reaumatics_doctor,
      has_any_importanting_bleeding,
      has_any_know_blood_issues,
      has_any_know_hormonal_issues,
      has_any_know_tireoids_issues,
      have_problems_with_healing,
      have_rheumatic_fever,
      kidney_damage,
      if_yes_what_kidney_problem,
      main_issue,
      recent_disease_history,
      preagnant,
      if_yes_how_many_months,
      take_calcium,
      use_drugs,
      undergoing_medical_treatment,
      if_yes_what_treatment,
      if_yes_what_drug,
      you_are_using_any_corticosteroids,
      taking_any_medication,
      if_yes_what_medication,
      if_yes_when_was_the_last_drink,
      use_acetil_salicilic_acid,
      smoker,
      if_yes_how_many_cigarretes_perday,
      you_have_already_made_blood_testing,
      take_hormone,
      take_contraceptives,
      what_contraceptives,
      if_yes_for_what,
      if_yes_how_long_to_stop,
      if_yes_what_medicine,
      if_yes_when_made_it,
      if_yes_when,
      anamnesis_prontuary_id,
      terms_readed,
      patient_signed
    }: Main_anamnesis_questionnaire = req.body;
    const newMainQuestionnaire = prisma.main_anamnesis_questionnaire.create({
        data: {
            anamnesis_prontuary: {
                connect: {
                    id: anamnesis_prontuary_id
            }
            },
            allergic_to_any_medicine: allergic_to_any_medicine,
            if_yes_what_medicine: if_yes_what_medicine,
            allergic_to_latex: allergic_to_latex,
            already_used_local_anestesics: already_used_local_anestesics,
            any_heart_problems: any_heart_problems,
            if_yes_what_hearth_problem: if_yes_what_hearth_problem,
            are_breastfeeding: are_breastfeeding,
            arterial_hypertension: arterial_hypertension,
            if_yes_any_treatment_for_hypertension: if_yes_any_treatment_for_hypertension,
            breathing_problems: breathing_problems,
            if_yes_what_breathing_problem: if_yes_what_breathing_problem,
            consider_a_alcolic_addicted: consider_a_alcolic_addicted, //BUG
            if_yes_when_was_the_last_drink: if_yes_when_was_the_last_drink,
            diabetes_mellitus: diabetes_mellitus,
            if_yes_any_treatment_for_diabetes: if_yes_any_treatment_for_diabetes,
            entered_the_process_of_menopause: entered_the_process_of_menopause,
            if_yes_guided_by_the_gynecologist: if_yes_guided_by_the_gynecologist,
            family_background: family_background,
            if_yes_what_familys_problems: if_yes_what_familys_problems, //BUG
            gastric_problems: gastric_problems,
            if_yes_what_gastric_problems: if_yes_what_gastric_problems,
            if_yes_you_looked_for_gastric_doctor: if_yes_you_looked_for_gastric_doctor,
            has_any_importanting_bleeding: has_any_importanting_bleeding, //BUG
            if_yes_how_long_to_stop: if_yes_how_long_to_stop,
            if_yes_when: if_yes_when,
            have_problems_with_healing: have_problems_with_healing,
            has_any_know_blood_issues: has_any_know_blood_issues,
            has_any_know_hormonal_issues: has_any_know_hormonal_issues,
            has_any_know_tireoids_issues: has_any_know_tireoids_issues, //BUG
            have_rheumatic_fever: have_rheumatic_fever,
            joints_problems_or_reumatics: joints_problems_or_reumatics,
            if_yes_you_looked_for_reaumatics_doctor: if_yes_you_looked_for_reaumatics_doctor,
            kidney_damage: kidney_damage,
            if_yes_what_kidney_problem: if_yes_what_kidney_problem,
            main_issue: main_issue,
            preagnant: preagnant, //BUG
            if_yes_how_many_months: if_yes_how_many_months,
            recent_disease_history: recent_disease_history,
            smoker: smoker,
            if_yes_how_many_cigarretes_perday: if_yes_how_many_cigarretes_perday, //BUG
            take_calcium: take_calcium,
            take_contraceptives: take_contraceptives,
            what_contraceptives: what_contraceptives,
            take_hormone: take_hormone,
            undergoing_medical_treatment: undergoing_medical_treatment,
            if_yes_what_treatment: if_yes_what_treatment,
            use_acetil_salicilic_acid: use_acetil_salicilic_acid, //BUG
            if_yes_for_what: if_yes_for_what,
            taking_any_medication: taking_any_medication,
            if_yes_what_medication: if_yes_what_medication,
            use_drugs: use_drugs,
            if_yes_what_drug: if_yes_what_drug,
            you_are_using_any_corticosteroids: you_are_using_any_corticosteroids,
            you_have_already_made_blood_testing: you_have_already_made_blood_testing,
            if_yes_when_made_it: if_yes_when_made_it,
            you_presented_reaction: you_presented_reaction,
            terms_readed: terms_readed, //BUG
            patient_signed: patient_signed,
            signed_date: new Date(moment().format())
        }
    })
    return res.status(201).json({response: "Anamnesis questionnaire completed"});
  }
}

export default new MainAnamnesisQuestionnaire();

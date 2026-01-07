import { Request, Response } from "express";
import { analyzeSymptoms } from "../services/sehatai.service";

export async function diagnose(req: Request, res: Response) {
  try {
    const {
      patient_id,
      symptoms,
      duration_days,
      severity,
      medical_history
    } = req.body;

    const result = await analyzeSymptoms({
      patient_id,
      symptoms,
      duration_days,
      severity,
      medical_history
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Diagnosis failed" });
  }
}

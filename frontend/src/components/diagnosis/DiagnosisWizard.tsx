// src/components/diagnosis/DiagnosisWizard.tsx
import { useContext, useState } from "react";
import { ChevronRight, X, User, Activity, BarChart3 } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import { analyzeSymptoms } from "../../api/diagnosis.api";
import Card from "../ui/Card";
import Button from "../ui/Button";
import LoadingMatrix from "../layout/LoadingMatrix";

export default function DiagnosisWizard() {
  const { dispatch } = useContext(AppContext);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    age: "",
    gender: "",
    symptom: "",
    duration: "",
    severity: 5
  });

  const steps = [
    { title: "About You", icon: User },
    { title: "Symptoms", icon: Activity },
    { title: "Details", icon: BarChart3 }
  ];

  async function handleNext() {
    if (step < steps.length - 1) {
      setStep(step + 1);
      return;
    }

    setLoading(true);
    const result = await analyzeSymptoms({
      patient_id: "CURRENT_USER",
      symptoms: [form.symptom],
      duration_days: form.duration
    });

    dispatch({ type: "ADD_DIAGNOSIS", payload: result });
    dispatch({ type: "SET_VIEW", payload: "results" });
  }

  if (loading) return <LoadingMatrix />;

  return (
    <div className="max-w-3xl mx-auto pt-8">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-xs uppercase text-cyan-500">
            Step {step + 1} / {steps.length}
          </p>
          <h2 className="text-3xl font-bold text-white">{steps[step].title}</h2>
        </div>
        <button onClick={() => dispatch({ type: "SET_VIEW", paylo_

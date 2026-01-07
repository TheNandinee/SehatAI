import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function PatientDetailView() {
  const { state, dispatch } = useContext(AppContext);
  const patient = state.selectedPatient;

  if (!patient) return null;

  return (
    <div className="max-w-4xl mx-auto pt-8">
      <Button onClick={() => dispatch({ type: "SET_VIEW", payload: "doctor-dashboard" })}>
        Back
      </Button>

      <Card className="mt-6 p-6">
        <h2 className="text-2xl font-bold text-white">{patient.name}</h2>
        <p className="text-slate-400">Patient ID: {patient.id}</p>
        <p className="mt-4 text-slate-300">
          AI Notes: High-priority review recommended.
        </p>
      </Card>
    </div>
  );
}

import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import TechBadge from "../components/ui/TechBadge";

export default function DoctorDashboard() {
  const { dispatch } = useContext(AppContext);

  const patients = [
    { id: "P-1", name: "Sarah Connor", risk: "High" },
    { id: "P-2", name: "James Howlett", risk: "Low" }
  ];

  return (
    <div className="max-w-6xl mx-auto pt-8">
      <h1 className="text-3xl font-bold text-white mb-6">
        Doctor Dashboard
      </h1>

      <div className="space-y-4">
        {patients.map(p => (
          <Card
            key={p.id}
            className="cursor-pointer"
            onClick={() => {
              dispatch({ type: "SET_SELECTED_PATIENT", payload: p });
              dispatch({ type: "SET_VIEW", payload: "patient-detail" });
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-white font-bold">{p.name}</span>
              <TechBadge color={p.risk === "High" ? "rose" : "emerald"}>
                {p.risk} Risk
              </TechBadge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

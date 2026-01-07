// src/pages/AuthView.tsx
import { useContext, useState } from "react";
import { Activity } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function AuthView() {
  const { dispatch } = useContext(AppContext);
  const [role, setRole] = useState<"patient" | "doctor">("patient");

  function handleSubmit(e: any) {
    e.preventDefault();
    dispatch({
      type: "LOGIN",
      payload: {
        id: "U-1",
        name: role === "doctor" ? "Dr. Smith" : "Alex",
        email: "demo@sehatai.ai",
        role
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <Activity className="mx-auto text-cyan-500" size={40} />
          <h1 className="text-3xl font-bold text-white mt-2">
            SEHAT<span className="text-cyan-500">AI</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={role}
            onChange={e => setRole(e.target.value as any)}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <Button fullWidth>Continue</Button>
        </form>
      </Card>
    </div>
  );
}

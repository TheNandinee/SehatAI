import { PhoneOff } from "lucide-react";
import Button from "../components/ui/Button";

export default function VideoConsultView() {
  return (
    <div className="h-[70vh] flex flex-col items-center justify-center">
      <div className="text-slate-400 mb-6">Video Consultation (Mock)</div>
      <Button variant="danger">
        <PhoneOff size={18} /> End Call
      </Button>
    </div>
  );
}

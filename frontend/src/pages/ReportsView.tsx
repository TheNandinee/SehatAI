import Card from "../components/ui/Card";

export default function ReportsView() {
  return (
    <div className="max-w-5xl mx-auto pt-8">
      <h2 className="text-3xl font-bold text-white mb-6">
        Department Reports
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 text-slate-400">Patient Volume (Placeholder)</Card>
        <Card className="p-6 text-slate-400">Risk Distribution (Placeholder)</Card>
      </div>
    </div>
  );
}

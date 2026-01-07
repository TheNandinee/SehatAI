import Card from "../components/ui/Card";

export default function StaffView() {
  const staff = ["Dr. House", "Dr. Strange", "Nurse Joy"];

  return (
    <div className="max-w-5xl mx-auto pt-8">
      <h2 className="text-3xl font-bold text-white mb-6">Staff</h2>

      <div className="grid grid-cols-3 gap-4">
        {staff.map(s => (
          <Card key={s} className="p-4 text-white">
            {s}
          </Card>
        ))}
      </div>
    </div>
  );
}

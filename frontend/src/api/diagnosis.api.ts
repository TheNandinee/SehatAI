export async function analyzeSymptoms(payload: any) {
  const res = await fetch("/api/diagnosis", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Diagnosis failed");
  return res.json();
}

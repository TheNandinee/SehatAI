export async function sendChatMessage(payload: {
  message: string;
  mode: string;
  context_id?: string;
}) {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Chat failed");
  return res.json();
}

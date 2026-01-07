export async function login(payload: {
  email: string;
  password: string;
  role: "patient" | "doctor";
}) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) throw new Error("Login failed");
  return res.json();
}

export async function logout() {
  localStorage.removeItem("token");
}

interface User {
  id: string;
  email: string;
  role: "patient" | "doctor";
}

export function loginUser(email: string, role: User["role"]): User {
  return {
    id: "U-" + Date.now(),
    email,
    role
  };
}

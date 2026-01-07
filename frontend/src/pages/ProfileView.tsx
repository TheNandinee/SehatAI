import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function ProfileView() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="max-w-2xl mx-auto pt-8">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-white">Profile</h2>
        <p className="text-slate-400">{state.user?.email}</p>

        <Button
          className="mt-6"
          onClick={() => dispatch({ type: "LOGOUT" })}
        >
          Log Out
        </Button>
      </Card>
    </div>
  );
}

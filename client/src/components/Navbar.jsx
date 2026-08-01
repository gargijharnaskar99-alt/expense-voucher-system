import { LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md h-16 flex items-center justify-between px-8">

      <h1 className="text-2xl font-bold text-blue-600">
        Expense Voucher System
      </h1>

      <div className="flex items-center gap-5">

        <div className="flex items-center gap-2">

          <User className="text-gray-600" />

          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">
              {user?.role}
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
        >
          <LogOut size={18} />
        </button>

      </div>

    </header>
  );
}
import { useAuth } from "../context/AuthContext";

export default function WelcomeCard() {

  const { user } = useAuth();

  return (

    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-8 shadow-lg">

      <h1 className="text-4xl font-bold">

        Welcome,
        {" "}
        {user?.name}

      </h1>

      <p className="mt-2 opacity-90">

        Manage your expense vouchers efficiently.

      </p>

    </div>

  );

}
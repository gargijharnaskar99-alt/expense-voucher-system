import { useEffect, useState } from "react";
import {
  Receipt,
  Clock3,
  CircleCheckBig,
  CircleX,
  IndianRupee,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/axios";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/expenses/dashboard");
      setStats(res.data.statistics);
    } catch (error) {
      console.log(error);
    }
  };

  if (!stats) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-[70vh]">
          <h2 className="text-2xl font-semibold text-gray-600">
            Loading Dashboard...
          </h2>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <DashboardCard
          title="Total Expenses"
          value={stats.totalExpenses}
          color="bg-blue-600"
          icon={<Receipt size={32} />}
        />

        <DashboardCard
          title="Pending"
          value={stats.pending}
          color="bg-yellow-500"
          icon={<Clock3 size={32} />}
        />

        <DashboardCard
          title="Approved"
          value={stats.approved}
          color="bg-green-600"
          icon={<CircleCheckBig size={32} />}
        />

        <DashboardCard
          title="Rejected"
          value={stats.rejected}
          color="bg-red-600"
          icon={<CircleX size={32} />}
        />

        <DashboardCard
          title="Total Amount"
          value={`₹${stats.totalAmount}`}
          color="bg-purple-600"
          icon={<IndianRupee size={32} />}
        />

      </div>
    </DashboardLayout>
  );
}

function DashboardCard({
  title,
  value,
  color,
  icon,
}) {
  return (
    <div
      className={`${color} text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm opacity-90">{title}</p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div>{icon}</div>

      </div>
    </div>
  );
}
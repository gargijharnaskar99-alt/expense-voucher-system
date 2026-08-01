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
        <div className="text-center text-xl mt-20">
          Loading Dashboard...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Employee Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <DashboardCard
          title="Total Expenses"
          value={stats.totalExpenses}
          icon={<Receipt size={32} />}
          color="bg-blue-600"
        />

        <DashboardCard
          title="Pending"
          value={stats.pending}
          icon={<Clock3 size={32} />}
          color="bg-yellow-500"
        />

        <DashboardCard
          title="Approved"
          value={stats.approved}
          icon={<CircleCheckBig size={32} />}
          color="bg-green-600"
        />

        <DashboardCard
          title="Rejected"
          value={stats.rejected}
          icon={<CircleX size={32} />}
          color="bg-red-600"
        />

        <DashboardCard
          title="Total Amount"
          value={`₹${stats.totalAmount}`}
          icon={<IndianRupee size={32} />}
          color="bg-purple-600"
        />

      </div>

    </DashboardLayout>
  );
}

function DashboardCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className={`${color} rounded-2xl p-6 shadow-lg text-white`}
    >
      <div className="flex justify-between items-center">

        <div>
          <p className="text-sm opacity-90">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div>{icon}</div>

      </div>
    </div>
  );
}
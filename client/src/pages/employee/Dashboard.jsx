import { useEffect, useState } from "react";
import API from "../../api/axios";
import DashboardLayout from "../../layouts/DashboardLayout";

import WelcomeCard from "../../components/WelcomeCard";
import StatCard from "../../components/StatCard";
import Charts from "../../components/Charts";
import RecentActivity from "../../components/RecentActivity";
import LoadingSpinner from "../../components/LoadingSpinner";

import {
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

export default function EmployeeDashboard() {

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalExpenses: 0,
    totalAmount: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const res = await API.get("/expenses");

      const data = res.data.expenses;

      setExpenses(data);

      setStats({
        totalExpenses: data.length,

        totalAmount: data.reduce(
          (sum, item) => sum + item.amount,
          0
        ),

        approved: data.filter(
          (e) => e.status === "Approved"
        ).length,

        pending: data.filter(
          (e) => e.status === "Pending"
        ).length,

        rejected: data.filter(
          (e) => e.status === "Rejected"
        ).length,
      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <LoadingSpinner text="Loading Dashboard..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <WelcomeCard />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Expenses"
          value={stats.totalExpenses}
          color="bg-blue-600"
          icon={<Receipt size={36} />}
        />

        <StatCard
          title="Approved"
          value={stats.approved}
          color="bg-green-600"
          icon={<CheckCircle size={36} />}
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="bg-yellow-500"
          icon={<Clock size={36} />}
        />

        <StatCard
          title="Rejected"
          value={stats.rejected}
          color="bg-red-600"
          icon={<XCircle size={36} />}
        />

      </div>

      <Charts statistics={stats} />

      <div className="mt-10">

        <RecentActivity
          expenses={expenses}
        />

      </div>

    </DashboardLayout>
  );
}
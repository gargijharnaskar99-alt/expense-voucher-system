import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Bar,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#22C55E",
  "#FACC15",
  "#EF4444",
  "#8B5CF6",
];

export default function Charts({ statistics }) {

  const statusData = [
    {
      name: "Approved",
      value: statistics.approved,
    },
    {
      name: "Pending",
      value: statistics.pending,
    },
    {
      name: "Rejected",
      value: statistics.rejected,
    },
  ];

  const summaryData = [
    {
      name: "Total",
      value: statistics.totalExpenses,
    },
    {
      name: "Amount",
      value: statistics.totalAmount,
    },
  ];

  return (

    <div className="grid md:grid-cols-2 gap-8 mt-10">

      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-xl font-bold mb-5">
          Expense Status
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              outerRadius={110}
              label
            >

              {statusData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>

      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-xl font-bold mb-5">
          Expense Summary
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={summaryData}>

            <CartesianGrid strokeDasharray="3 3"/>

            <XAxis dataKey="name"/>

            <YAxis/>

            <Tooltip/>

            <Legend/>

            <Bar
              dataKey="value"
              fill="#3B82F6"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}
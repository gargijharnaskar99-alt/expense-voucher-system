export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <div
      className={`${color} rounded-2xl text-white shadow-lg p-6 hover:scale-105 transition duration-300`}
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="opacity-90">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>

        </div>

        <div>
          {icon}
        </div>

      </div>

    </div>
  );
}
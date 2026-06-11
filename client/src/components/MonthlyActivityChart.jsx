import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function MonthlyActivityChart({
  activities,
}) {

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Initialize month data
  const monthlyData = months.map((month) => ({
    month,
    activities: 0,
  }));

  // Count activities by start date
  activities.forEach((activity) => {

    if (!activity.startDate) return;

    const date = new Date(activity.startDate);

    const monthIndex = date.getMonth();

    if (monthIndex >= 0 && monthIndex < 12) {
      monthlyData[monthIndex].activities += 1;
    }

  });

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Monthly Activities
          </h2>

          <p className="text-gray-500 mt-1">
            Distribution of activities throughout the academic year
          </p>

        </div>

      </div>

      <div className="h-[380px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={monthlyData}>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tickLine={false}
            />

            <YAxis
              allowDecimals={false}
              tickLine={false}
            />

            <Tooltip />

            <Bar
              dataKey="activities"
              fill="#2563EB"
              radius={[10, 10, 0, 0]}
              maxBarSize={45}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
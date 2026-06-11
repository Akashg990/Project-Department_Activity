import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function CategoryChart({ activities }) {

  
  // CATEGORY COUNTS
  const categoryData = [];



  const categoryMap = {};



  activities.forEach((activity) => {

    if (categoryMap[activity.activityType]) {

      categoryMap[activity.activityType]++;

    } else {

      categoryMap[activity.activityType] = 1;

    }
  });



  Object.keys(categoryMap).forEach((key) => {

    categoryData.push({
      name: key,
      value: categoryMap[key],
    });

  });




  const COLORS = [
    "#2563EB",
    "#16A34A",
    "#9333EA",
    "#EA580C",
    "#DC2626",
  ];




  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">

      <h2 className="text-2xl font-bold mb-6">
        Activities by Category
      </h2>



      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              outerRadius={120}
              label
            >

              {categoryData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    COLORS[index % COLORS.length]
                  }
                />

              ))}

            </Pie>



            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
export default function DashboardCard({
  title,
  value,
  color,
}) {

  return (
    <div className="bg-white rounded-xl shadow-md p-6">

      
      {/* Title */}
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>




      {/* Value */}
      <h1 className={`text-4xl font-bold mt-4 ${color}`}>

        {value}

      </h1>

    </div>
  );
}
export default function StatCard({
  title,
  value,
  description,
  icon: Icon,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition">

      <div className="flex justify-between items-start">

        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            {value}
          </h3>

          <p className="text-xs text-gray-500 mt-2">
            {description}
          </p>
        </div>

        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
          <Icon size={21} />
        </div>

      </div>

    </div>
  );
}
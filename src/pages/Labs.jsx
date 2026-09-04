const labs = [
  {
    name: "M301",
    computers: 30,
    working: 28,
    issues: 2,
  },
  {
    name: "M323",
    computers: 30,
    working: 25,
    issues: 5,
  },
  {
    name: "M332",
    computers: 30,
    working: 21,
    issues: 9,
  },
];

export default function Labs() {
  return (
    <div className="space-y-7">

      <div>
        <h1 className="text-3xl font-bold">
          IT Labs
        </h1>

        <p className="text-gray-500 mt-1">
          Monitor all department laboratories.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">

        {labs.map((lab) => (

          <div
            key={lab.name}
            className="bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-xl transition"
          >

            <div className="flex justify-between">

              <div>
                <p className="text-xs text-gray-400 uppercase">
                  Laboratory
                </p>

                <h2 className="text-3xl font-bold mt-1">
                  {lab.name}
                </h2>
              </div>

              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                🖥️
              </div>

            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Computers
                </p>
                <p className="text-xl font-bold mt-1">
                  {lab.computers}
                </p>
              </div>

              <div className="bg-emerald-50 rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  Working
                </p>
                <p className="text-xl font-bold mt-1 text-emerald-600">
                  {lab.working}
                </p>
              </div>

            </div>

            <div className="mt-5">

              <div className="flex justify-between text-sm mb-2">
                <span>Operational</span>
                <span>
                  {Math.round(
                    (lab.working / lab.computers) * 100
                  )}%
                </span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">

                <div
                  className="h-full bg-black rounded-full"
                  style={{
                    width: `${(lab.working / lab.computers) * 100}%`,
                  }}
                />

              </div>

            </div>

            <p className="text-sm text-gray-500 mt-5">
              {lab.issues} active issues
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
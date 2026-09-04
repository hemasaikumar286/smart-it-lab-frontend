const computers = Array.from(
  { length: 30 },
  (_, i) => ({
    id: i + 1,
    status:
      i === 5 || i === 12
        ? "issue"
        : i === 18
        ? "maintenance"
        : "working",
  })
);

export default function Computers() {
  return (
    <div className="space-y-7">

      <div>
        <h1 className="text-3xl font-bold">
          Computer Inventory
        </h1>

        <p className="text-gray-500 mt-1">
          M323 laboratory equipment status.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-7">

        <div className="flex gap-5 mb-8">

          <span className="text-sm">
            🟢 Working
          </span>

          <span className="text-sm">
            🟡 Maintenance
          </span>

          <span className="text-sm">
            🔴 Issue
          </span>

        </div>

        <div className="grid grid-cols-6 gap-4">

          {computers.map((pc) => {

            const styles = {
              working:
                "bg-emerald-50 border-emerald-200 text-emerald-700",

              maintenance:
                "bg-amber-50 border-amber-200 text-amber-700",

              issue:
                "bg-red-50 border-red-200 text-red-700",
            };

            return (
              <div
                key={pc.id}
                className={`border rounded-xl p-5 text-center ${styles[pc.status]}`}
              >

                <div className="text-xl">
                  🖥️
                </div>

                <p className="font-bold mt-2">
                  PC-{String(pc.id).padStart(2, "0")}
                </p>

                <p className="text-xs mt-1 capitalize">
                  {pc.status}
                </p>

              </div>
            );
          })}

        </div>

      </div>

    </div>
  );
}
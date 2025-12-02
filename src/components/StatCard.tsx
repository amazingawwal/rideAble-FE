import type { StatCardProps } from "../assets/types";

export default function StatCard({ icon, title, value }: StatCardProps) {
  return (
    <div className="p-4 bg-gray-50 rounded-xl shadow-sm flex items-center gap-3">
      <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}

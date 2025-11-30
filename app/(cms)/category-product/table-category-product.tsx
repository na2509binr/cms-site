import { CategoryProduct } from "@/app/types/category-product";
import { useState } from "react";

type Props = {
  records: CategoryProduct[];
  onSelect: (record: CategoryProduct) => void;
  onDelete: (id: number) => void;
};

export default function TableCategory({ records, onSelect, onDelete }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto border rounded shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2">Select</th>
            <th className="px-4 py-2 text-left">Tiêu đề</th>
            <th className="px-4 py-2 text-left">Slug</th>
            <th className="px-4 py-2 text-left">Active</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.map((c) => (
            <tr key={c.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <input
                  type="radio"
                  checked={selectedId === c.id}
                  onChange={() => {
                    setSelectedId(c.id);
                    onSelect(c);
                  }}
                />
              </td>

              <td className="px-4 py-2">{c.title}</td>
              <td className="px-4 py-2">{c.slug}</td>
              <td className="px-4 py-2">{c.isActive ? "Yes" : "No"}</td>

              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onDelete(c.id!)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}

          {records.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center py-4 text-gray-500">
                Không có category nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

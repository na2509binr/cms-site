import { Product } from "@/app/types/product";
import { useState } from "react";

type Props = {
  records: Product[];
  onSelect: (record: Product) => void;
  onDelete: (id: number) => void;
};

export default function TableProduct({ records, onSelect, onDelete }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto border rounded shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Select</th>
            <th className="px-4 py-2 text-left">Tên</th>
            <th className="px-4 py-2 text-left">Giá</th>
            <th className="px-4 py-2 text-left">Giá khuyến mãi</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {records.map((p) => (
            <tr key={p.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <input
                  type="radio"
                  checked={selectedId === p.id}
                  onChange={() => {
                    setSelectedId(p.id);
                    onSelect(p);
                  }}
                />
              </td>
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.price.toLocaleString()}₫</td>
              <td className="px-4 py-2">{p.salePrice.toLocaleString()}₫</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onDelete(p.id)}
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
                Không có sản phẩm nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

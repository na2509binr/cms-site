import { SeoMeta } from "@/app/types/seo-meta";
import { useState } from "react";

type Props = {
    records: SeoMeta[];
    onSelect: (record: SeoMeta) => void;
    onDelete: (id: number) => void;
};

export default function TableSeoMeta({ records, onSelect, onDelete }: Props) {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    return (
        <div className="overflow-x-auto border rounded shadow">
            <table className="min-w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-2 text-left">Select</th>
                        <th className="px-4 py-2 text-left">Title</th>
                        <th className="px-4 py-2 text-left">Description</th>
                        <th className="px-4 py-2 text-center">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y">
                    {records.map((m) => (
                        <tr key={m.id} className="hover:bg-gray-100">
                            <td className="px-4 py-2">
                                <input
                                    type="radio"
                                    checked={selectedId === m.id}
                                    onChange={() => {
                                        setSelectedId(m.id!);
                                        onSelect(m);
                                    }}
                                />
                            </td>

                            <td className="px-4 py-2">{m.title}</td>
                            <td className="px-4 py-2">{m.description}</td>

                            <td className="px-4 py-2 text-center">
                                <button
                                    onClick={() => onDelete(m.id!)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}

                    {records.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center py-4 text-gray-500">
                                Không có bản ghi SEO Meta nào
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

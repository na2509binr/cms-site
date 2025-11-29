// import { useState } from "react";

// type RecordType = {
//   id: number;
//   name: string;
//   email: string;
// };

// type RecordTableProps = {
//   records: RecordType[];
//   onSelect: (record: RecordType) => void;
//   onDelete: (id: number) => void;
// };

// export default function TableUser({ records, onSelect, onDelete }: RecordTableProps) {
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   const handleSelect = (record: RecordType) => {
//     setSelectedId(record.id);
//     onSelect(record);
//   };

//   return (
//     <div className="overflow-x-auto border border-gray-300 rounded shadow">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left">Select</th>
//             <th className="px-4 py-2 text-left">Name</th>
//             <th className="px-4 py-2 text-left">Email</th>
//             <th className="px-4 py-2 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-200">
//           {records.map((record) => (
//             <tr key={record.id} className="hover:bg-gray-100">
//               {/* Radio select */}
//               <td className="px-4 py-2 text-left">
//                 <input
//                   type="radio"
//                   name="selectedRecord"
//                   checked={selectedId === record.id}
//                   onChange={() => handleSelect(record)}
//                   className="cursor-pointer"
//                 />
//               </td>

//               {/* Name */}
//               <td className="px-4 py-2">{record.name}</td>

//               {/* Email */}
//               <td className="px-4 py-2">{record.email}</td>

//               {/* Delete button */}
//               <td className="px-4 py-2 text-center">
//                 <button
//                   onClick={() => onDelete(record.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
//                 >
//                   Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {records.length === 0 && (
//             <tr>
//               <td colSpan={4} className="px-4 py-4 text-center text-gray-500">
//                 Không có bản ghi nào
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }









import { User } from "@/app/types/user";
import { useState } from "react";


type Props = {
  records: User[];
  onSelect: (record: User) => void;
  onDelete: (id: string) => void;
};

export default function TableUser({ records, onSelect, onDelete }: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto border rounded shadow">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left">Select</th>
            <th className="px-4 py-2 text-left">Họ và Tên</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Mật khẩu</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {records.map((u) => (
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="px-4 py-2">
                <input
                  type="radio"
                  checked={selectedId === u.id}
                  onChange={() => {
                    setSelectedId(u.id);
                    onSelect(u);
                  }}
                />
              </td>
              <td className="px-4 py-2">{u.displayName}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.passwordHash}</td>
              <td className="px-4 py-2 text-center">
                <button
                  onClick={() => onDelete(u.id)}
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
                Không có bản ghi nào
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// import { Product } from "@/app/types/product";
// import { useState } from "react";

// type Props = {
//   records: Product[];
//   onSelect: (record: Product) => void;
//   onDelete: (id: number) => void;
// };

// export default function TableProduct({ records, onSelect, onDelete }: Props) {
//   const [selectedId, setSelectedId] = useState<number | null>(null);

//   return (
//     <div className="overflow-x-auto border rounded shadow">
//       <table className="min-w-full">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left">Select</th>
//             <th className="px-4 py-2 text-left">Tên</th>
//             <th className="px-4 py-2 text-left">Giá</th>
//             <th className="px-4 py-2 text-left">Giá khuyến mãi</th>
//             <th className="px-4 py-2 text-center">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y">
//           {records.map((p) => (
//             <tr key={p.id} className="hover:bg-gray-100">
//               <td className="px-4 py-2">
//                 <input
//                   type="radio"
//                   checked={selectedId === p.id}
//                   onChange={() => {
//                     setSelectedId(p.id);
//                     onSelect(p);
//                   }}
//                 />
//               </td>
//               <td className="px-4 py-2">{p.name}</td>
//               <td className="px-4 py-2">{p.price.toLocaleString()}₫</td>
//               <td className="px-4 py-2">{p.salePrice.toLocaleString()}₫</td>
//               <td className="px-4 py-2 text-center">
//                 <button
//                   onClick={() => onDelete(p.id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                 >
//                   Xóa
//                 </button>
//               </td>
//             </tr>
//           ))}

//           {records.length === 0 && (
//             <tr>
//               <td colSpan={5} className="text-center py-4 text-gray-500">
//                 Không có sản phẩm nào
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }



import { Product } from "@/app/types/product";
import { useState } from "react";

type Props = {
  records: Product[];
  onSelect: (record: Product) => void;
  onDelete: (id: number) => void;
  pageSize?: number; // số sản phẩm mỗi trang, mặc định 5
};

function formatDate(dateStr: string) {
    const d = new Date(dateStr);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
}


export default function TableProduct({ records, onSelect, onDelete, pageSize = 10 }: Props) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(records.length / pageSize);
  const startIdx = (currentPage - 1) * pageSize;
  const currentRecords = records.slice(startIdx, startIdx + pageSize);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Select</th>
              <th className="px-4 py-2 text-left">Ảnh</th>
              <th className="px-4 py-2 text-left">Tên</th>
              <th className="px-4 py-2 text-left">Giá</th>
              <th className="px-4 py-2 text-left">Giá khuyến mãi</th>
              <th className="px-4 py-2 text-left">Thể loại</th>
              <th className="px-4 py-2 text-left">Mô tả</th>
              {/* <th className="px-4 py-2 text-left">Nội dung</th> */}
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Ngày tạo</th>
              <th className="px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {currentRecords.map((p) => (
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
                <td className="px-4 py-2">{p.image.toLocaleString()}</td>
                <td className="px-4 py-2">{p.name}</td>
                <td className="px-4 py-2">{p.price.toLocaleString()}₫</td>
                <td className="px-4 py-2">{p.salePrice.toLocaleString()}₫</td>
                <td className="px-4 py-2">{p.cateId}</td>
                <td className="px-4 py-2">{p.description}</td>
                {/* <td className="px-4 py-2">{p.content}</td> */}
                <td className="px-4 py-2">{p.isActive}</td>
                <td className="px-4 py-2">{formatDate(p.createDate)}</td>
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

            {currentRecords.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
                  Không có sản phẩm nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 border rounded ${page === currentPage ? 'bg-gray-200 font-bold' : ''}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

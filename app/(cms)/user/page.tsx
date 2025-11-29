// "use client"

// import { useState } from "react";
// import InsertUpdateUser from "./insert-update-user";
// import TableUser from "./table-user";

// export default function UserPage() {

//     const [records, setRecords] = useState([
//         { id: 1, name: "Alice", email: "alice@example.com" },
//         { id: 2, name: "Bob", email: "bob@example.com" },
//         { id: 3, name: "Charlie", email: "charlie@example.com" },
//     ]);

//     const [updateData, setUpdateData] = useState({ name: "", email: "" });

//     const handleSelect = (record: { name: string; email: string }) => {
//         setUpdateData({ name: record.name, email: record.email });
//     };

//     const handleDelete = (id: number) => {
//         setRecords(records.filter((r) => r.id !== id));
//         // Nếu đang chọn bản ghi xóa thì reset updateData
//         if (updateData.name && records.find((r) => r.id === id)?.name === updateData.name) {
//             setUpdateData({ name: "", email: "" });
//         }
//     };

//     return (

//         <div className="space-y-6">
//             {/* Record Table */}
//             <InsertUpdateUser initialData={updateData} />


//             <TableUser
//                 records={records}
//                 onSelect={handleSelect}
//                 onDelete={handleDelete}
//             />

//             {/* Update Form */}
//         </div>
//     );

// }



"use client";

import { useEffect, useState } from "react";
import InsertUpdateForm from "./insert-update-user";
import TableUser from "./table-user";
import { User } from "@/app/types/user";

export default function UserPage() {
  const [records, setRecords] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState<Partial<User>>({});

  // 🔥 Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user/get-all");
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSelect = (record: User) => {
    setUpdateData(record);
  };

  const handleDelete = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete?id=${id}`, { method: "DELETE" });
    fetchUsers(); // reload
  };

  return (
    <div className="space-y-8">
      <InsertUpdateForm initialData={updateData} fetchUsers={fetchUsers} />

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <TableUser records={records} onSelect={handleSelect} onDelete={handleDelete} />
      )}
    </div>
  );
}



"use client";

import { useEffect, useState } from "react";

import { Member } from "@/app/types/member";
import InsertUpdateMemberForm from "./insert-update-member";
import TableMember from "./table-member";

export default function MemberPage() {
  const [records, setRecords] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState<Partial<Member>>({});

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/member/get-all`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Fetch members error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSelect = (record: Member) => setUpdateData(record);

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/member/delete?id=${id}`, { method: "DELETE" });
    fetchMembers();
  };

  return (
    <div className="space-y-8">
      <InsertUpdateMemberForm initialData={updateData} fetchMembers={fetchMembers} />
      {loading ? <p>Đang tải...</p> : <TableMember records={records} onSelect={handleSelect} onDelete={handleDelete} />}
    </div>
  );
}

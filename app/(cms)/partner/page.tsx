"use client";

import { useEffect, useState } from "react";

import { Partner } from "@/app/types/partner";
import InsertUpdatePartnerForm from "./insert-update-partner";
import TablePartner from "./table-partner";

export default function PartnerPage() {
  const [records, setRecords] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState<Partial<Partner>>({});

  const fetchPartners = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partner/get-all`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Fetch partners error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const handleSelect = (record: Partner) => setUpdateData(record);

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partner/delete?id=${id}`, { method: "DELETE" });
    fetchPartners();
  };

  return (
    <div className="space-y-8">
      <InsertUpdatePartnerForm initialData={updateData} fetchPartners={fetchPartners} />
      {loading ? <p>Đang tải...</p> : <TablePartner records={records} onSelect={handleSelect} onDelete={handleDelete} />}
    </div>
  );
}

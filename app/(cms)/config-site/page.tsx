"use client";

import { useEffect, useState } from "react";
import InsertUpdateConfigSiteForm from "./insert-update-config-site";
import { ConfigSite } from "@/app/types/config-stie";



export default function ConfigSitePage() {
  const [records, setRecords] = useState<ConfigSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState<Partial<ConfigSite>>({});

  const fetchConfigSites = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/configsite/get-all`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Fetch config site error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigSites();
  }, []);

  const handleSelect = (record: ConfigSite) => setUpdateData(record);

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/configsite/delete?id=${id}`, { method: "DELETE" });
    fetchConfigSites();
  };

  return (
    <div className="space-y-8">
      <InsertUpdateConfigSiteForm initialData={updateData} fetchConfigSites={fetchConfigSites} />
      {/* {loading ? <p>Đang tải...</p> : <TableConfigSite records={records} onSelect={handleSelect} onDelete={handleDelete} />} */}
    </div>
  );
}

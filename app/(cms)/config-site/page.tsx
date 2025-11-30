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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/config-site/get-all`);
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


  return (
    <div className="space-y-8">
      <InsertUpdateConfigSiteForm initialData={updateData} fetchConfigSites={fetchConfigSites} />
      {/* {loading ? <p>Đang tải...</p> : <TableConfigSite records={records} onSelect={handleSelect} onDelete={handleDelete} />} */}
    </div>
  );
}

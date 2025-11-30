"use client";

import { useEffect, useState } from "react";
import { SeoMeta } from "@/app/types/seo-meta";
import InsertUpdateSeoMetaForm from "./insert-update-seo-meta";
import TableSeoMeta from "./table-seo-meta";


export default function SeoMetaPage() {
    const [records, setRecords] = useState<SeoMeta[]>([]);
    const [loading, setLoading] = useState(true);
    const [updateData, setUpdateData] = useState<Partial<SeoMeta>>({});

    const fetchSeoMetas = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo-meta/get-all`);
            const data = await res.json();
            setRecords(data);
        } catch (err) {
            console.error("Fetch SeoMeta error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSeoMetas();
    }, []);

    const handleSelect = (record: SeoMeta) => {
        setUpdateData(record);
    };

    const handleDelete = async (id: number) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo-meta/delete?id=${id}`, {
            method: "DELETE",
        });
        fetchSeoMetas();
    };

    return (
        <div className="space-y-8">
            <InsertUpdateSeoMetaForm initialData={updateData} fetchSeoMetas={fetchSeoMetas} />

            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <TableSeoMeta records={records} onSelect={handleSelect} onDelete={handleDelete} />
            )}
        </div>
    );
}

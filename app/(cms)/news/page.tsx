"use client";

import { useEffect, useState } from "react";
import { News } from "@/app/types/news";
import InsertUpdateNews from "./insert-update-news";
import TableNews from "./table-news";

export default function NewsPage() {
    const [records, setRecords] = useState<News[]>([]);
    const [loading, setLoading] = useState(true);
    const [updateData, setUpdateData] = useState<Partial<News>>({});

    const fetchNews = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/new/get-all`);
            const data = await res.json();
            setRecords(data);
        } catch (err) {
            console.error("Fetch News error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleSelect = (record: News) => {
        setUpdateData(record);
    };

    const handleDelete = async (id: number) => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/new/delete?id=${id}`, {
            method: "DELETE",
        });
        fetchNews();
    };

    return (
        <div className="space-y-8">
            <InsertUpdateNews initialData={updateData} fetchNews={fetchNews} />

            {loading ? (
                <p>Đang tải...</p>
            ) : (
                <TableNews records={records} onSelect={handleSelect} onDelete={handleDelete} />
            )}
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { News } from "@/app/types/news";

type Props = {
    initialData?: Partial<News>;
    fetchNews: () => void;
};

export default function InsertUpdateNews({ initialData, fetchNews }: Props) {
    const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");

    const [formData, setFormData] = useState<Partial<News>>({
        title: "",
        description: "",
        view: 0,
        image: "",
        author: "",
        active: true,
        order: 0,
    });

    useEffect(() => {
        if (initialData && initialData.id) {
            setActiveTab("update");
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const api = activeTab === "insert"
            ? "/api/new/insert"
            : "/api/new/update";

        await fetch(`${process.env.NEXT_PUBLIC_API_URL}${api}`, {
            method: activeTab === "insert" ? "POST" : "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        setFormData({
            title: "",
            description: "",
            view: 0,
            image: "",
            author: "",
            active: true,
            order: 0,
        });

        setActiveTab("insert");
        fetchNews();
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
            <div className="flex border-b mb-4">
                {["insert", "update"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 ${
                            activeTab === tab
                                ? "border-b-2 border-blue-500 text-blue-500"
                                : "text-gray-500 hover:text-blue-500"
                        }`}
                    >
                        {tab === "insert" ? "Insert" : "Update"}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.form
                    key={activeTab}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                >
                    {[
                        "title",
                        "description",
                        "image",
                        "author",
                        "order",
                        "view",
                    ].map((field) => (
                        <div key={field}>
                            <label className="block mb-1 font-medium">{field}</label>
                            <input
                                name={field}
                                value={(formData as any)[field] ?? ""}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2"
                            />
                        </div>
                    ))}

                    <div>
                        <label className="block font-medium mb-1">Active</label>
                        <input
                            type="checkbox"
                            name="active"
                            checked={formData.active ?? true}
                            onChange={handleChange}
                        />{" "}
                        Hiển thị
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 rounded text-white ${
                            activeTab === "insert"
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                        {activeTab === "insert" ? "Insert" : "Update"}
                    </button>
                </motion.form>
            </AnimatePresence>
        </div>
    );
}

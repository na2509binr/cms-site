"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SeoMeta } from "@/app/types/seo-meta";

type Props = {
    initialData?: Partial<SeoMeta>;
    fetchSeoMetas: () => void;
};

export default function InsertUpdateSeoMetaForm({ initialData, fetchSeoMetas }: Props) {
    const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");

    const [formData, setFormData] = useState<Partial<SeoMeta>>({
        title: "",
        description: "",
        keywords: "",
        canonicalUrl: "",
        imageUrl: "",
        ogType: "website",
        ogTitle: "",
        ogDescription: "",
        ogImage: "",
        twitterCard: "summary_large_image",
        twitterTitle: "",
        twitterDescription: "",
        twitterImage: "",
        jsonLd: "",
    });

    useEffect(() => {
        if (initialData && initialData.id) {
            setActiveTab("update");
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === "insert") {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo-meta/insert`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        } else {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seo-meta/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        }

        // Reset
        setFormData({
            title: "",
            description: "",
            keywords: "",
            canonicalUrl: "",
            imageUrl: "",
            ogType: "website",
            ogTitle: "",
            ogDescription: "",
            ogImage: "",
            twitterCard: "summary_large_image",
            twitterTitle: "",
            twitterDescription: "",
            twitterImage: "",
            jsonLd: "",
        });

        setActiveTab("insert");
        fetchSeoMetas();
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
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
                    {/** List Input Fields */}
                    {[
                        "title",
                        "description",
                        "keywords",
                        "canonicalUrl",
                        "imageUrl",
                        "ogType",
                        "ogTitle",
                        "ogDescription",
                        "ogImage",
                        "twitterCard",
                        "twitterTitle",
                        "twitterDescription",
                        "twitterImage",
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
                        <label className="block mb-1 font-medium">JSON-LD</label>
                        <textarea
                            name="jsonLd"
                            value={formData.jsonLd ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 h-32"
                        />
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

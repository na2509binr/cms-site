"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/app/types/product";

type Props = {
    initialData?: Partial<Product>;
    fetchProducts: () => void;
};

export default function InsertUpdateProductForm({ initialData, fetchProducts }: Props) {
    const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        price: 0,
        salePrice: 0,
        description: "",
        content: "",
        image: "",
        url: "",
        cateId: undefined,
        isActive: true,
    });

    useEffect(() => {
        if (initialData && initialData.id) {
            setActiveTab("update");
            setFormData(initialData);
        }
    }, [initialData]);

    //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value, type, checked } = e.target;
    //     setFormData({
    //       ...formData,
    //       [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    //     });
    //   };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const target = e.target as HTMLInputElement; // cast
        const { name, value, type, checked } = target;

        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
        });
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === "insert") {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/insert`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        } else {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        }

        setFormData({
            name: "",
            price: 0,
            salePrice: 0,
            description: "",
            content: "",
            image: "",
            url: "",
            cateId: undefined,
            isActive: true,
        });
        setActiveTab("insert");
        fetchProducts();
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <div className="flex border-b mb-4">
                {["insert", "update"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-blue-500"
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
                    <div>
                        <label className="block mb-1 font-medium">Tên sản phẩm</label>
                        <input
                            name="name"
                            value={formData.name ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập tên sản phẩm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Giá</label>
                        <input
                            name="price"
                            type="number"
                            value={formData.price ?? 0}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập giá gốc"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Giá khuyến mãi</label>
                        <input
                            name="salePrice"
                            type="number"
                            value={formData.salePrice ?? 0}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập giá khuyến mãi"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Ảnh</label>
                        <input
                            name="image"
                            value={formData.image ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập URL ảnh"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">URL sản phẩm</label>
                        <input
                            name="url"
                            value={formData.url ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập URL sản phẩm"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Mô tả</label>
                        <textarea
                            name="description"
                            value={formData.description ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập mô tả"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Nội dung</label>
                        <textarea
                            name="content"
                            value={formData.content ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập nội dung chi tiết"
                        />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={formData.isActive ?? true}
                            onChange={handleChange}
                        />
                        <label className="font-medium">Active</label>
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-2 rounded text-white ${activeTab === "insert" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
                            }`}
                    >
                        {activeTab === "insert" ? "Insert" : "Update"}
                    </button>
                </motion.form>
            </AnimatePresence>
        </div>
    );
}

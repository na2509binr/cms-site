"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CategoryProduct } from "@/app/types/category-product";

type Props = {
  initialData?: Partial<CategoryProduct>;
  fetchCategories: () => void;
};

export default function InsertUpdateCategoryForm({ initialData, fetchCategories }: Props) {
  const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");
  const [formData, setFormData] = useState<Partial<CategoryProduct>>({
    title: "",
    desciption: "",
    image: "",
    slug: "",
    parentId: undefined,
    isActive: true,
    showMenu: true,
  });

  useEffect(() => {
    if (initialData && initialData.id) {
      setActiveTab("update");
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url =
      activeTab === "insert"
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/category-product/insert`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/category-product/update`;

    await fetch(url, {
      method: activeTab === "insert" ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({
      title: "",
      desciption: "",
      image: "",
      slug: "",
      parentId: undefined,
      isActive: true,
      showMenu: true,
    });
    setActiveTab("insert");
    fetchCategories();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <div className="flex border-b mb-4">
        {["insert", "update"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500"
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
            <label className="block mb-1 font-medium">Tiêu đề</label>
            <input
              name="title"
              value={formData.title ?? ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Slug</label>
            <input
              name="slug"
              value={formData.slug ?? ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ảnh</label>
            <input
              name="image"
              value={formData.image ?? ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Mô tả</label>
            <textarea
              name="desciption"
              value={formData.desciption ?? ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Parent ID</label>
            <input
              type="number"
              name="parentId"
              value={formData.parentId ?? ""}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Để trống nếu là category cha"
            />
          </div>

          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="isActive" checked={formData.isActive ?? true} onChange={handleChange} />
              <span>Active</span>
            </label>

            <label className="flex items-center space-x-2">
              <input type="checkbox" name="showMenu" checked={formData.showMenu ?? true} onChange={handleChange} />
              <span>Show Menu</span>
            </label>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              activeTab === "insert" ? "bg-blue-500" : "bg-green-500"
            }`}
          >
            {activeTab === "insert" ? "Insert" : "Update"}
          </button>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

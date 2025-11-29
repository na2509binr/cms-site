"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Partner } from "@/app/types/partner";

type Props = {
  initialData?: Partial<Partner>;
  fetchPartners: () => void;
};

export default function InsertUpdatePartnerForm({ initialData, fetchPartners }: Props) {
  const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");
  const [formData, setFormData] = useState<Partial<Partner>>({
    name: "",
    image: "",
    url: "",
    order: 0,
    isActive: true,
    showWeb: true,
  });

  useEffect(() => {
    if (initialData && initialData.id) {
      setActiveTab("update");
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value, type, checked } = e.target;
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
      });
    } else if (e.target instanceof HTMLTextAreaElement) {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (activeTab === "insert") {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partner/insert`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/partner/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setFormData({ name: "", image: "", url: "", order: 0, isActive: true, showWeb: true });
    setActiveTab("insert");
    fetchPartners();
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <div className="flex border-b mb-4">
        {["insert", "update"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-2 ${
              activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-500 hover:text-blue-500"
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
            <label className="block mb-1 font-medium">Tên</label>
            <input name="name" value={formData.name ?? ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Ảnh</label>
            <input name="image" value={formData.image ?? ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">URL</label>
            <input name="url" value={formData.url ?? ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Thứ tự</label>
            <input name="order" type="number" value={formData.order ?? 0} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" name="isActive" checked={formData.isActive ?? true} onChange={handleChange} />
            <label className="font-medium">Kích hoạt</label>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" name="showWeb" checked={formData.showWeb ?? true} onChange={handleChange} />
            <label className="font-medium">Hiển thị web</label>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              activeTab === "insert" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {activeTab === "insert" ? "Insert" : "Update"}
          </button>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

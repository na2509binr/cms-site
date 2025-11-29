"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ConfigSite } from "@/app/types/config-stie";

type Props = {
  initialData?: Partial<ConfigSite>;
  fetchConfigSites: () => void;
};

export default function InsertUpdateConfigSiteForm({ initialData, fetchConfigSites }: Props) {
  const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");
  const [formData, setFormData] = useState<Partial<ConfigSite>>({
    email: "",
    hotline: "",
    description: "",
    infoContact: "",
    infoFooter: "",
    image: "",
    favicon: "",
    googleMap: "",
    googleAnalytics: "",
    place: "",
    aboutImage: "",
    aboutText: "",
    aboutUrl: "",
    facebook: "",
    zalo: "",
    instagram: "",
    linkedin: "",
    tiktok: "",
    twitter: "",
    x: "",
    youtube: "",
    pinterest: "",
    liveChat: "",
  });

  useEffect(() => {
    if (initialData && initialData.id) {
      setActiveTab("update");
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const { name, value } = target as HTMLInputElement | HTMLTextAreaElement;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = activeTab === "insert"
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/configsite/insert`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/configsite/update`;

    const method = activeTab === "insert" ? "POST" : "PUT";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setFormData({
      email: "",
      hotline: "",
      description: "",
      infoContact: "",
      infoFooter: "",
      image: "",
      favicon: "",
      googleMap: "",
      googleAnalytics: "",
      place: "",
      aboutImage: "",
      aboutText: "",
      aboutUrl: "",
      facebook: "",
      zalo: "",
      instagram: "",
      linkedin: "",
      tiktok: "",
      twitter: "",
      x: "",
      youtube: "",
      pinterest: "",
      liveChat: "",
    });
    setActiveTab("insert");
    fetchConfigSites();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
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
          {/* Chỉ liệt kê một số field chính, các field khác có thể copy pattern */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input name="email" value={formData.email ?? ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Hotline</label>
            <input name="hotline" value={formData.hotline ?? ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea name="description" value={formData.description ?? ""} onChange={handleChange} className="w-full border rounded px-3 py-2" />
          </div>

          {/* Các field mạng xã hội */}
          <div className="grid grid-cols-2 gap-2">
            <input name="facebook" placeholder="Facebook" value={formData.facebook ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="zalo" placeholder="Zalo" value={formData.zalo ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="instagram" placeholder="Instagram" value={formData.instagram ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="linkedin" placeholder="LinkedIn" value={formData.linkedin ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="tiktok" placeholder="Tiktok" value={formData.tiktok ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="twitter" placeholder="Twitter" value={formData.twitter ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="x" placeholder="X" value={formData.x ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="youtube" placeholder="Youtube" value={formData.youtube ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="pinterest" placeholder="Pinterest" value={formData.pinterest ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
            <input name="liveChat" placeholder="Live Chat" value={formData.liveChat ?? ""} onChange={handleChange} className="border rounded px-2 py-1" />
          </div>

          <button type="submit" className={`w-full py-2 rounded text-white ${activeTab === "insert" ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"}`}>
            {activeTab === "insert" ? "Insert" : "Update"}
          </button>
        </motion.form>
      </AnimatePresence>
    </div>
  );
}

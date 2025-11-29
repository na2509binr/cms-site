"use client";

import { useEffect, useState } from "react";

import { Product } from "@/app/types/product";
import InsertUpdateProductForm from "./insert-update-product";
import TableProduct from "./table-product";

export default function ProductPage() {
  const [records, setRecords] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState<Partial<Product>>({});

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-all`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Fetch products error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelect = (record: Product) => {
    setUpdateData(record);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/delete?id=${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="space-y-8">
      <InsertUpdateProductForm initialData={updateData} fetchProducts={fetchProducts} />

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <TableProduct records={records} onSelect={handleSelect} onDelete={handleDelete} />
      )}
    </div>
  );
}

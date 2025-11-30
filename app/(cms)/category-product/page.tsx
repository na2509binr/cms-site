"use client";

import { useEffect, useState } from "react";
import { CategoryProduct } from "@/app/types/category-product";
import InsertUpdateCategoryForm from "./insert-update-category-product";
import TableCategory from "./table-category-product";


export default function CategoryPage() {
  const [records, setRecords] = useState<CategoryProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [updateData, setUpdateData] = useState<Partial<CategoryProduct>>({});

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category-product/get-all`);
      const data = await res.json();
      setRecords(data);
    } catch (err) {
      console.error("Fetch categories error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSelect = (record: CategoryProduct) => {
    setUpdateData(record);
  };

  const handleDelete = async (id: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/category-product/delete?id=${id}`, {
      method: "DELETE",
    });
    fetchCategories();
  };

  return (
    <div className="space-y-8">
      <InsertUpdateCategoryForm initialData={updateData} fetchCategories={fetchCategories} />

      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <TableCategory records={records} onSelect={handleSelect} onDelete={handleDelete} />
      )}
    </div>
  );
}

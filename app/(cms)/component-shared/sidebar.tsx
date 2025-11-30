"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeAlert, Bean, ChartBarStacked, ChevronLeft, ChevronRight, Flag, Handshake, Home, Newspaper, Settings, User, Users } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: open ? 280 : 70 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 text-white h-full flex flex-col items-start p-4 relative"
      >
        {/* Nút toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 shadow-lg border border-gray-700 hover:bg-gray-700 transition"
        >
          {open ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>

        {/* Nội dung menu */}
        <nav className="mt-6 flex flex-col gap-3 w-full">
          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <Home size={20} />
            {open && <span>Trang chủ</span>}
          </a>
          <a
            href="/user"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <User size={20} />
            {open && <span>Tài khoản</span>}
          </a>
          <a
            href="/config-site"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <BadgeAlert size={20} />
            {open && <span>Thông tin chung Website</span>}
          </a>
          {/* <a
            href="/seo-meta"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <Flag size={20} />
            {open && <span>SEO</span>}
          </a> */}
          <a
            href="/product"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <Bean size={20} />
            {open && <span>Sản phẩm</span>}
          </a>
          <a
            href="/category-product"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <ChartBarStacked  size={20} />
            {open && <span>Thể loại sản phẩm</span>}
          </a>
          <a
            href="/news"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <Newspaper size={20} />
            {open && <span>Bài viết</span>}
          </a>

          <a
            href="/member"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <Users size={20} />
            {open && <span>Thành viên</span>}
          </a>
          <a
            href="/partner"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <Handshake size={20} />
            {open && <span>Đối tác</span>}
          </a>

          <a
            href="#"
            className="flex items-center gap-3 p-2 rounded hover:bg-gray-700 transition"
          >
            <Settings size={20} />
            {open && <span>Cài đặt</span>}
          </a>
        </nav>
      </motion.aside>
    </div>
  );
}

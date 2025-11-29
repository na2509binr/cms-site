"use client";
import { Bell, Search, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="flex items-center justify-end bg-white shadow px-6 py-3 ">
      {/* Ô tìm kiếm */}
      {/* <div className="flex items-center bg-gray-100 rounded-lg px-3 py-1 w-72">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-transparent outline-none ml-2 w-full text-sm"
        />
      </div> */}

      {/* Khu vực user + thông báo */}
      <div className="flex items-center gap-5">
        {/* <button className="relative text-gray-600 hover:text-black">
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] rounded-full px-1">
            3
          </span>
        </button> */}

        <div className="flex items-center gap-2 cursor-pointer ">
          <User size={22} className="text-gray-600" />
          <span className="font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}

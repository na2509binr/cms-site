// "use client"

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// type FormData = { name: string; email: string };

// type InsertUpdateFormProps = {
//     initialData?: FormData;
// };

// export default function InsertUpdateForm({ initialData }: InsertUpdateFormProps) {
//     //   const [records, setRecords] = useState<RecordType[]>([]);
//     //   const [formData, setFormData] = useState({ id: 0, name: "", email: "" });
//   const [loading, setLoading] = useState(false);
//   const [isUpdate, setIsUpdate] = useState(false);
//     const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");
//     // const [formData, setFormData] = useState({ name: "", email: "" });
//     const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
//     useEffect(() => {
//         if (initialData) {
//             setFormData(initialData);
//         }
//     }, [initialData]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };


//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         alert(`${activeTab.toUpperCase()}: ${JSON.stringify(formData)}`);
//         setFormData({ name: "", email: "" });
//     };

//     // const handleSubmit = async (e: React.FormEvent) => {
//     //     e.preventDefault();
//     //     try {
//     //         if (isUpdate) {
//     //             // Update
//     //             const res = await fetch(`${API_URL}/${formData.id}`, {
//     //                 method: "PUT",
//     //                 headers: { "Content-Type": "application/json" },
//     //                 body: JSON.stringify({ name: formData.name, email: formData.email }),
//     //             });
//     //             if (!res.ok) throw new Error("Update failed");
//     //         } else {
//     //             // Insert
//     //             const res = await fetch(API_URL, {
//     //                 method: "POST",
//     //                 headers: { "Content-Type": "application/json" },
//     //                 body: JSON.stringify({ name: formData.name, email: formData.email }),
//     //             });
//     //             if (!res.ok) throw new Error("Insert failed");
//     //         }

//     //         // Refresh data và reset form
//     //         await fetchRecords();
//     //         setFormData({ id: 0, name: "", email: "" });
//     //         setIsUpdate(false);
//     //     } catch (error) {
//     //         console.error(error);
//     //     }
//     // };


//     return (
//         <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
//             {/* Nav Tabs */}
//             <div className="flex border-b mb-4">
//                 {["insert", "update"].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === tab
//                             ? "border-b-2 border-blue-500 text-blue-500"
//                             : "text-gray-500 hover:text-blue-500"
//                             }`}
//                         onClick={() => setActiveTab(tab as "insert" | "update")}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             {/* Form Container */}
//             <div className="relative">
//                 <AnimatePresence mode="wait">

//                     {/* FORM INSERT */}
//                     {activeTab === "insert" && (
//                         <motion.form
//                             key="insert"
//                             onSubmit={handleSubmit}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -20 }}
//                             transition={{ duration: 0.15 }}
//                             className="space-y-4"
//                         >
//                             <h2 className="text-lg font-semibold mb-2">Insert Record</h2>
//                             <div>
//                                 <label className="block mb-1 font-medium">Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                     placeholder="Enter name"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 font-medium">Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                     placeholder="Enter email"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//                             >
//                                 Insert
//                             </button>
//                         </motion.form>
//                     )}



//                     {/* FORM UPDATE */}
//                     {activeTab === "update" && (
//                         <motion.form
//                             key="update"
//                             onSubmit={handleSubmit}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -20 }}
//                             transition={{ duration: 0.15 }}
//                             className="space-y-4"
//                         >
//                             <h2 className="text-lg font-semibold mb-2">Update Record</h2>
//                             <div>
//                                 <label className="block mb-1 font-medium">Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//                                     placeholder="Enter name"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 font-medium">Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//                                     placeholder="Enter email"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//                             >
//                                 Update
//                             </button>
//                         </motion.form>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }




"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "@/app/types/user";


type Props = {
    initialData?: Partial<User>;
    fetchUsers: () => void;
};

export default function InsertUpdateForm({ initialData, fetchUsers }: Props) {
    const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");
    const [formData, setFormData] = useState<Partial<User>>({
        displayName: "",
        email: "",
    });

    useEffect(() => {
        if (initialData && initialData.id) {
            setActiveTab("update");
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (activeTab === "insert") {
            console.log(process.env.NEXT_PUBLIC_API_URL);
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        } else {
            await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/user/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
        }

        setFormData({ displayName: "", email: "" });
        setActiveTab("insert");
        fetchUsers();
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
            <div className="flex border-b mb-4">
                {["insert", "update"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-2 ${activeTab === tab
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
                    <div>
                        <label className="block mb-1 font-medium">Họ và tên</label>
                        <input
                            name="displayName"
                            value={formData.displayName ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập tên"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            name="email"
                            value={formData.email ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập email"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 font-medium">Mật khẩu</label>
                        <input
                            name="passwordHash"
                            type="password"
                            value={formData.passwordHash ?? ""}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Nhập mật khẩu"
                        />
                    </div>
                    

                    <button
                        type="submit"
                        className={`w-full py-2 rounded text-white ${activeTab === "insert"
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















// "use client"

// import { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// type FormData = { name: string; email: string };

// type InsertUpdateFormProps = {
//   initialData?: FormData;
// };

// export default function InsertUpdateForm({ initialData }: InsertUpdateFormProps) {
//     const [activeTab, setActiveTab] = useState<"insert" | "update">("insert");
//     // const [formData, setFormData] = useState({ name: "", email: "" });
//   const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };


//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         alert(`${activeTab.toUpperCase()}: ${JSON.stringify(formData)}`);
//         setFormData({ name: "", email: "" });
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
//             {/* Nav Tabs */}
//             <div className="flex border-b mb-4">
//                 {["insert", "update"].map((tab) => (
//                     <button
//                         key={tab}
//                         className={`flex-1 py-2 text-center font-medium transition-colors ${activeTab === tab
//                                 ? "border-b-2 border-blue-500 text-blue-500"
//                                 : "text-gray-500 hover:text-blue-500"
//                             }`}
//                         onClick={() => setActiveTab(tab as "insert" | "update")}
//                     >
//                         {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                     </button>
//                 ))}
//             </div>

//             {/* Form Container */}
//             <div className="relative">
//                 <AnimatePresence mode="wait">

//                     {/* FORM INSERT */}
//                     {activeTab === "insert" && (
//                         <motion.form
//                             key="insert"
//                             onSubmit={handleSubmit}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -20 }}
//                             transition={{ duration: 0.15 }}
//                             className="space-y-4"
//                         >
//                             <h2 className="text-lg font-semibold mb-2">Insert Record</h2>
//                             <div>
//                                 <label className="block mb-1 font-medium">Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                     placeholder="Enter name"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 font-medium">Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                                     placeholder="Enter email"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
//                             >
//                                 Insert
//                             </button>
//                         </motion.form>
//                     )}



//                     {/* FORM UPDATE */}
//                     {activeTab === "update" && (
//                         <motion.form
//                             key="update"
//                             onSubmit={handleSubmit}
//                             initial={{ opacity: 0, x: 20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             exit={{ opacity: 0, x: -20 }}
//                             transition={{ duration: 0.15 }}
//                             className="space-y-4"
//                         >
//                             <h2 className="text-lg font-semibold mb-2">Update Record</h2>
//                             <div>
//                                 <label className="block mb-1 font-medium">Name</label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     value={formData.name}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//                                     placeholder="Enter name"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 font-medium">Email</label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
//                                     placeholder="Enter email"
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
//                             >
//                                 Update
//                             </button>
//                         </motion.form>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     );
// }

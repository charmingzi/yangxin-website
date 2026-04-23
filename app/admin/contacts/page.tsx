"use client";

import { useEffect, useState } from "react";

interface Contact {
  id: string;
  name: string;
  company?: string;
  phone?: string;
  email?: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function ContactsAdmin() {
  const [items, setItems] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<"all" | "pending" | "done">("all");

  const load = () => fetch("/api/admin/contacts").then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/admin/contacts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/admin/contacts?id=${id}`, { method: "DELETE" });
    load();
  };

  const filtered = items.filter(i => filter === "all" || i.status === filter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">留言管理</h1>
        <div className="flex gap-2">
          {(["all", "pending", "done"] as const).map(f => (
            <button key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm ${filter === f ? "bg-[#0066cc] text-white" : "bg-white text-gray-600 border"}`}>
              {f === "all" ? "全部" : f === "pending" ? "未处理" : "已处理"}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map(item => (
          <div key={item.id} className={`bg-white rounded-xl p-5 shadow-sm border-l-4 ${
            item.status === "pending" ? "border-orange-400" : "border-green-400"
          }`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="font-bold text-gray-800 mr-2">{item.name}</span>
                {item.company && <span className="text-gray-500 text-sm">@{item.company}</span>}
                <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                  item.status === "pending" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"
                }`}>
                  {item.status === "pending" ? "未处理" : "已处理"}
                </span>
              </div>
              <div className="flex gap-2">
                {item.status === "pending" && (
                  <button onClick={() => updateStatus(item.id, "done")}
                    className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                    标记已处理
                  </button>
                )}
                <button onClick={() => handleDelete(item.id)}
                  className="text-xs text-red-500 hover:underline">删除</button>
              </div>
            </div>
            <div className="text-sm text-gray-500 mb-2 flex gap-4">
              {item.phone && <span>📞 {item.phone}</span>}
              {item.email && <span>✉️ {item.email}</span>}
              <span>🕐 {new Date(item.createdAt).toLocaleString("zh-CN")}</span>
            </div>
            <p className="text-gray-700 text-sm bg-gray-50 rounded-lg p-3">{item.message}</p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">暂无数据</div>
        )}
      </div>
    </div>
  );
}

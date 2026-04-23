"use client";

import { useEffect, useState } from "react";

interface News {
  id: string;
  title: string;
  content: string;
  cover?: string;
  source?: string;
  type: string;
  sort: number;
  createdAt: string;
}

export default function NewsAdmin() {
  const [items, setItems] = useState<News[]>([]);
  const [modal, setModal] = useState<Partial<News> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => fetch("/api/admin/news").then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!modal?.title || !modal?.content) return;
    setLoading(true);
    await fetch("/api/admin/news", {
      method: modal.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(modal),
    });
    setLoading(false);
    setModal(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/admin/news?id=${id}`, { method: "DELETE" });
    load();
  };

  const typeLabel = (type: string) => type === "company" ? "公司新闻" : "行业动态";

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">新闻管理</h1>
        <button onClick={() => setModal({ title: "", content: "", type: "company" })}
          className="bg-[#0066cc] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#004c99]">
          + 添加新闻
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600 w-20">排序</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">标题</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">类型</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">来源</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">发布时间</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {[...items].sort((a, b) => b.sort - a.sort).map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-500">{item.sort || 0}</td>
                <td className="px-4 py-3 font-medium text-gray-800 max-w-[300px] truncate">{item.title}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${item.type === "company" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}`}>
                    {typeLabel(item.type)}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{item.source || "-"}</td>
                <td className="px-4 py-3 text-gray-500">{new Date(item.createdAt).toLocaleDateString("zh-CN")}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => setModal(item)} className="text-blue-600 hover:underline mr-3">编辑</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">删除</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-gray-400">暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">{modal.id ? "编辑新闻" : "添加新闻"}</h2>
            <div className="space-y-3">
              <input placeholder="新闻标题 *" value={modal.title || ""}
                onChange={e => setModal({ ...modal, title: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <div className="flex gap-3">
                <select value={modal.type || "company"}
                  onChange={e => setModal({ ...modal, type: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white">
                  <option value="company">公司新闻</option>
                  <option value="industry">行业动态</option>
                </select>
                <input type="number" placeholder="排序(越大越前)" value={modal.sort || 0}
                  onChange={e => setModal({ ...modal, sort: parseInt(e.target.value) || 0 })}
                  className="w-32 border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <input placeholder="来源（如：官网）" value={modal.source || ""}
                onChange={e => setModal({ ...modal, source: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <input placeholder="封面图URL" value={modal.cover || ""}
                onChange={e => setModal({ ...modal, cover: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <textarea placeholder="新闻内容 *" rows={8} value={modal.content || ""}
                onChange={e => setModal({ ...modal, content: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">取消</button>
              <button onClick={handleSave} disabled={loading}
                className="bg-[#0066cc] text-white px-6 py-2 rounded-lg text-sm hover:bg-[#004c99] disabled:opacity-50">
                {loading ? "保存中..." : "保存"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

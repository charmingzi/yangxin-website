"use client";

import { useEffect, useState } from "react";

interface Case {
  id: string;
  title: string;
  category: string;
  tags: string | null;
  channel: string | null;
  year: string | null;
  description?: string;
  cover?: string;
  videoUrl?: string;
  content?: string;
  color: string;
  sort: number;
}

const defaultCase: Partial<Case> = {
  title: "",
  category: "其他",
  tags: "",
  channel: "",
  year: "",
  description: "",
  cover: "",
  videoUrl: "",
  content: "",
  color: "#1B5FBE",
  sort: 0,
};

export default function CasesAdmin() {
  const [items, setItems] = useState<Case[]>([]);
  const [modal, setModal] = useState<Partial<Case> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => fetch("/api/admin/cases").then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!modal?.title) return;
    setLoading(true);
    // Parse tags: "独家冠名,演唱会" → ["独家冠名","演唱会"]
    let parsedTags = null;
    if (modal.tags) {
      try {
        // If it's already a JSON array string, keep it; otherwise split by comma
        const raw = typeof modal.tags === "string" ? modal.tags : JSON.stringify(modal.tags);
        try { JSON.parse(raw); parsedTags = raw; } catch { parsedTags = JSON.stringify(raw.split(",").map(s => s.trim()).filter(Boolean)); }
      } catch { parsedTags = null; }
    }
    await fetch("/api/admin/cases", {
      method: modal.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...modal, tags: parsedTags, sort: modal.sort || 0 }),
    });
    setLoading(false);
    setModal(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/admin/cases?id=${id}`, { method: "DELETE" });
    load();
  };

  const displayTags = (tags: string | null): string => {
    if (!tags) return "-";
    try { return JSON.parse(tags).join(", "); } catch { return tags; }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">案例管理</h1>
        <button onClick={() => setModal({ ...defaultCase })}
          className="bg-[#0066cc] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#004c99]">
          + 添加案例
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">案例标题</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">分类</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">频道</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">年份</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">标签</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">排序</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">{item.title}</td>
                <td className="px-4 py-3 text-gray-500">{item.category}</td>
                <td className="px-4 py-3 text-gray-500">{item.channel || "-"}</td>
                <td className="px-4 py-3 text-gray-500">{item.year || "-"}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[150px] truncate">{displayTags(item.tags)}</td>
                <td className="px-4 py-3 text-gray-500">{item.sort}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => setModal({ ...item, tags: displayTags(item.tags) === "-" ? "" : displayTags(item.tags) })} className="text-blue-600 hover:underline mr-3">编辑</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">删除</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={7} className="text-center py-8 text-gray-400">暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">{modal.id ? "编辑案例" : "添加案例"}</h2>
            <div className="space-y-3">
              <input placeholder="案例标题 *" value={modal.title || ""}
                onChange={e => setModal({ ...modal, title: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="分类（如：白酒行业）" value={modal.category || ""}
                  onChange={e => setModal({ ...modal, category: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                <input placeholder="频道（如：CCTV-3 综艺频道）" value={modal.channel || ""}
                  onChange={e => setModal({ ...modal, channel: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="年份（如：2024）" value={modal.year || ""}
                  onChange={e => setModal({ ...modal, year: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                <div className="flex items-center gap-2">
                  <label className="text-xs text-gray-500 shrink-0">主色</label>
                  <input type="color" value={modal.color || "#1B5FBE"}
                    onChange={e => setModal({ ...modal, color: e.target.value })}
                    className="w-10 h-8 rounded border cursor-pointer" />
                </div>
              </div>
              <input placeholder="标签（逗号分隔，如：独家冠名,演唱会,品牌曝光）" value={typeof modal.tags === "string" ? modal.tags : ""}
                onChange={e => setModal({ ...modal, tags: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <input placeholder="视频URL（如：B站/腾讯视频链接）" value={modal.videoUrl || ""}
                onChange={e => setModal({ ...modal, videoUrl: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <input placeholder="封面图URL" value={modal.cover || ""}
                onChange={e => setModal({ ...modal, cover: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <input placeholder="排序数字（越小越靠前）" type="number" value={modal.sort || 0}
                onChange={e => setModal({ ...modal, sort: parseInt(e.target.value) || 0 })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              <textarea placeholder="案例简介（显示在卡片上）" rows={2} value={modal.description || ""}
                onChange={e => setModal({ ...modal, description: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none" />
              <textarea placeholder="案例详情（完整内容）" rows={4} value={modal.content || ""}
                onChange={e => setModal({ ...modal, content: e.target.value })}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none" />
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setModal(null)} className="px-4 py-2 text-sm text-gray-600">取消</button>
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

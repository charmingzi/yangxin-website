"use client";

import { useEffect, useState } from "react";

interface Resource {
  id: string;
  name: string;
  category: string;
  channel: string;
  program: string;
  timeSlot?: string;
  description?: string;
  price?: string;
  note?: string;
  isHot: boolean;
  sort: number;
}

const categories = ["节目时段广告", "主题套装广告", "创意内容定制", "新媒体广告"];

export default function ResourcesAdmin() {
  const [items, setItems] = useState<Resource[]>([]);
  const [modal, setModal] = useState<Partial<Resource> | null>(null);
  const [loading, setLoading] = useState(false);

  const load = () => fetch("/api/admin/resources").then(r => r.json()).then(setItems);
  useEffect(() => { load(); }, []);

  const handleSave = async () => {
    if (!modal?.name || !modal?.channel || !modal?.program) return;
    setLoading(true);
    await fetch("/api/admin/resources", {
      method: modal.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...modal,
        category: modal.category || "节目时段广告",
        sort: modal.sort || 0,
        isHot: modal.isHot || false,
      }),
    });
    setLoading(false);
    setModal(null);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("确定删除？")) return;
    await fetch(`/api/admin/resources?id=${id}`, { method: "DELETE" });
    load();
  };

  const categoryBadge = (cat: string) => {
    const colors: Record<string, string> = {
      "节目时段广告": "bg-orange-100 text-orange-700",
      "主题套装广告": "bg-blue-100 text-blue-700",
      "创意内容定制": "bg-green-100 text-green-700",
      "新媒体广告": "bg-purple-100 text-purple-700",
    };
    return colors[cat] || "bg-gray-100 text-gray-700";
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-800">广告资源管理</h1>
        <button onClick={() => setModal({ name: "", category: "节目时段广告", channel: "CCTV-1", program: "", sort: 0, isHot: false })}
          className="bg-[#0066cc] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#004c99]">
          + 添加资源
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-600">分类</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">名称</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">频道</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">节目</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">时段</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">价格</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">热门</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">操作</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${categoryBadge(item.category)}`}>
                    {item.category}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-800 max-w-[200px] truncate">{item.name}</td>
                <td className="px-4 py-3 text-gray-700">{item.channel}</td>
                <td className="px-4 py-3 text-gray-700">{item.program}</td>
                <td className="px-4 py-3 text-gray-500">{item.timeSlot || "-"}</td>
                <td className="px-4 py-3 text-gray-500 max-w-[160px] truncate" title={item.price || ""}>{item.price ? item.price.split("|")[0] + "…" : "-"}</td>
                <td className="px-4 py-3">{item.isHot ? "🔥" : ""}</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <button onClick={() => setModal(item)} className="text-blue-600 hover:underline mr-3">编辑</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:underline">删除</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={8} className="text-center py-8 text-gray-400">暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setModal(null)}>
          <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h2 className="text-lg font-bold mb-4">{modal.id ? "编辑资源" : "添加资源"}</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">分类 *</label>
                  <select value={modal.category || "节目时段广告"}
                    onChange={e => setModal({ ...modal, category: e.target.value } as Partial<Resource>)}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">频道 *</label>
                  <input placeholder="如：CCTV-1" value={modal.channel || ""}
                    onChange={e => setModal({ ...modal, channel: e.target.value } as Partial<Resource>)}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">资源名称 *</label>
                <input placeholder="如：CCTV-1《朝闻天下》后" value={modal.name || ""}
                  onChange={e => setModal({ ...modal, name: e.target.value } as Partial<Resource>)}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">节目 *</label>
                  <input placeholder="如：朝闻天下" value={modal.program || ""}
                    onChange={e => setModal({ ...modal, program: e.target.value } as Partial<Resource>)}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">时段</label>
                  <input placeholder="如：约 08:32" value={modal.timeSlot || ""}
                    onChange={e => setModal({ ...modal, timeSlot: e.target.value } as Partial<Resource>)}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">刊例价格</label>
                <input placeholder="如：5秒: 38,000 | 10秒: 55,000" value={modal.price || ""}
                  onChange={e => setModal({ ...modal, price: e.target.value } as Partial<Resource>)}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">价格备注</label>
                <input placeholder="如：刊例价格截止至2026年12月31日" value={modal.note || ""}
                  onChange={e => setModal({ ...modal, note: e.target.value } as Partial<Resource>)}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">描述</label>
                <textarea placeholder="资源描述" rows={3} value={modal.description || ""}
                  onChange={e => setModal({ ...modal, description: e.target.value } as Partial<Resource>)}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={modal.isHot || false}
                    onChange={e => setModal({ ...modal, isHot: e.target.checked } as Partial<Resource>)}
                    className="w-4 h-4" />
                  标记为热门资源
                </label>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">排序</label>
                  <input type="number" value={modal.sort || 0}
                    onChange={e => setModal({ ...modal, sort: parseInt(e.target.value) || 0 } as Partial<Resource>)}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
              </div>
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

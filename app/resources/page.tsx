"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Link from "next/link";

interface Resource {
  id: string;
  name: string;
  category: string;
  channel: string;
  program: string;
  timeSlot: string | null;
  description: string | null;
  price: string | null;
  note: string | null;
  isHot: boolean;
  sort: number;
}

const categoryColors: Record<string, string> = {
  "节目时段广告": "#e8621a",
  "主题套装广告": "#1B5FBE",
  "创意内容定制": "#059669",
  "新媒体广告": "#7c3aed",
};
const categoryOrder = ["节目时段广告", "主题套装广告", "创意内容定制", "新媒体广告"];

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("全部");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/resources")
      .then((r) => r.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["全部", ...categoryOrder.filter((c) => resources.some((r) => r.category === c))];

  const filtered = activeCategory === "全部" ? resources : resources.filter((r) => r.category === activeCategory);

  // Group by category for display
  const grouped = categoryOrder
    .filter((c) => {
      if (activeCategory !== "全部") return c === activeCategory;
      return resources.some((r) => r.category === c);
    })
    .map((cat) => ({
      category: cat,
      color: categoryColors[cat] || "#666",
      items: filtered.filter((r) => r.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0f2b5c]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8621a] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">首页</Link>
            <span className="text-white/30 text-sm">/</span>
            <span className="text-white text-sm">广告资源</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">广告资源</h1>
          <p className="text-white/50 text-base">央视全频道黄金时段广告资源，精准覆盖亿万观众</p>
        </div>
      </section>

      {/* Resources from API */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-gray-100">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-[#0f2b5c] text-white shadow-md"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
              >
                {cat}
                {cat !== "全部" && (
                  <span className="ml-1 opacity-60">
                    ({resources.filter((r) => r.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">加载中...</div>
          ) : grouped.length === 0 ? (
            <div className="text-center py-20 text-gray-400">暂无广告资源</div>
          ) : (
            grouped.map((group) => (
              <div key={group.category} className="mb-14">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-6 rounded-full" style={{ backgroundColor: group.color }} />
                  <h2 className="text-xl font-bold text-[#0f2b5c]">{group.category}</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">{group.items.length} 个产品</span>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {group.items.map((r) => (
                    <div
                      key={r.id}
                      className="bg-[#f7f8fa] rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all group flex flex-col"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div
                            className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-2"
                            style={{ backgroundColor: `${group.color}18`, color: group.color }}
                          >
                            {r.channel}
                          </div>
                          <h3 className="text-base font-bold text-[#0f2b5c] leading-snug">{r.name}</h3>
                        </div>
                        {r.isHot && (
                          <span className="shrink-0 text-xs font-bold px-2 py-1 bg-[#e8621a] text-white rounded-full">热</span>
                        )}
                      </div>

                      {/* Info */}
                      <div className="space-y-1.5 mb-4 flex-1">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <svg className="w-3.5 h-3.5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="font-medium">{r.timeSlot || "定制"}</span>
                          <span className="text-gray-300">·</span>
                          <span>{r.program}</span>
                        </div>
                        {r.description && (
                          <p className="text-xs text-gray-400 leading-relaxed pl-5">{r.description}</p>
                        )}
                      </div>

                      {/* CTA */}
                      <Link
                        href="/contact"
                        className="mt-auto bg-[#0f2b5c] hover:bg-[#163a7a] text-white text-xs font-semibold py-2.5 rounded-xl text-center transition-colors"
                      >
                        联系我们获取价格
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}

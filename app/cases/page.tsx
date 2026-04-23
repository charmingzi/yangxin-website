"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Link from "next/link";

interface CaseItem {
  id: string;
  title: string;
  category: string;
  tags: string | null;
  channel: string | null;
  year: string | null;
  description: string | null;
  cover: string | null;
  videoUrl: string | null;
  color: string;
  sort: number;
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState("全部");

  useEffect(() => {
    fetch("/api/public/cases")
      .then((r) => r.json())
      .then((data) => {
        setCases(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 从数据中提取所有分类
  const categories = ["全部", ...Array.from(new Set(cases.map((c) => c.category)))];
  const filtered = activeCat === "全部" ? cases : cases.filter((c) => c.category === activeCat);

  const parseTags = (tags: string | null): string[] => {
    if (!tags) return [];
    try { return JSON.parse(tags); } catch { return []; }
  };

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
            <span className="text-white text-sm">客户案例</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">客户案例</h1>
          <p className="text-white/50 text-base">服务 500+ 政企品牌，累积 1000+ 成功案例</p>
        </div>
      </section>

      {/* Case Video Preview */}
      <section className="relative py-16 bg-[#0f2b5c]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-[#e8621a]" />
            <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Video Gallery</span>
            <div className="w-8 h-px bg-[#e8621a]" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">央信合赢 · 案例视频</h2>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
            <video
              src="/case-video.mp4"
              controls
              className="w-full h-full object-contain"
              poster="/cctv-building-thumb.jpg"
            />
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      {categories.length > 1 && (
        <section className="bg-white border-b border-gray-100 sticky top-[68px] z-40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${
                    cat === activeCat
                      ? "bg-[#0f2b5c] text-white"
                      : "text-gray-500 hover:text-[#0f2b5c] hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cases grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-gray-400">加载中...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-2">暂无案例数据</p>
              <p className="text-gray-300 text-sm">请在后台管理中添加案例</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((c) => {
                const tags = parseTags(c.tags);
                return (
                  <div key={c.id} className="group bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:border-[#1B5FBE]/20 transition-all overflow-hidden">
                    {/* Top color bar */}
                    <div className="h-1.5 w-full" style={{ backgroundColor: c.color || "#1B5FBE" }} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-[#f7f8fa] text-gray-500">{c.category}</span>
                        {c.year && <span className="text-xs text-gray-400">{c.year}</span>}
                      </div>
                      <h3 className="text-base font-bold text-[#0f2b5c] mb-2 leading-snug group-hover:text-[#1B5FBE] transition-colors">{c.title}</h3>
                      {c.description && <p className="text-sm text-gray-400 mb-3 leading-relaxed">{c.description}</p>}
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map((t) => (
                            <span key={t} className="text-[10px] px-2 py-0.5 rounded border" style={{ borderColor: `${c.color || "#1B5FBE"}30`, color: c.color || "#1B5FBE" }}>{t}</span>
                          ))}
                        </div>
                        <Link href="/contact" className="text-xs font-semibold text-[#1B5FBE] hover:underline shrink-0 ml-2">获取方案</Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}

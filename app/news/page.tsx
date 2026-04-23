"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  content: string;
  cover: string | null;
  source: string | null;
  type: string;
  createdAt: string;
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/public/news")
      .then((r) => r.json())
      .then((data) => {
        // API returns { items, total, ... } or flat array
        const items = Array.isArray(data) ? data : data.items || [];
        setNews(items);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const formatDate = (d: string) => {
    const dt = new Date(d);
    const day = String(dt.getDate()).padStart(2, "0");
    const ymd = `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, "0")}.${day}`;
    return { day, ymd };
  };

  const typeLabel = (type: string) => type === "company" ? "公司新闻" : "行业动态";

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
            <span className="text-white text-sm">新闻资讯</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">新闻资讯</h1>
          <p className="text-white/50 text-base">行业动态 · 公司新闻 · 媒体资讯</p>
        </div>
      </section>

      {/* News list */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-20 text-gray-400">加载中...</div>
          ) : news.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 mb-2">暂无新闻数据</p>
              <p className="text-gray-300 text-sm">请在后台管理中添加新闻</p>
            </div>
          ) : (
            <div className="space-y-6">
              {news.map((n, i) => {
                const { day, ymd } = formatDate(n.createdAt);
                return (
                  <div key={n.id} className="group flex gap-6 p-6 rounded-2xl border border-gray-100 hover:border-[#1B5FBE]/20 hover:shadow-lg transition-all bg-white">
                    <div className="shrink-0 w-20 text-center">
                      <div className="text-2xl font-bold text-[#0f2b5c]">{day}</div>
                      <div className="text-xs text-gray-400">{ymd}</div>
                      {i === 0 && (
                        <div className="mt-1 text-[10px] font-bold text-white bg-[#e8621a] px-2 py-0.5 rounded-full">热</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-medium text-[#1B5FBE] bg-[#1B5FBE]/8 px-2.5 py-1 rounded-full">{typeLabel(n.type)}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#0f2b5c] mb-2 group-hover:text-[#1B5FBE] transition-colors leading-snug">{n.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{n.content?.slice(0, 120)}...</p>
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

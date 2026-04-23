"use client";

import { useEffect, useRef, useState } from "react";

interface Resource {
  id: string;
  name: string;
  channel: string;
  program: string;
  timeSlot: string | null;
  description: string | null;
  price: string | null;
  isHot: boolean;
  sort: number;
}

export default function Resources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/public/resources")
      .then((r) => r.json())
      .then((data) => setResources(data))
      .catch(() => {});
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="resources" className="py-28 bg-[#050e1f]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#E8621A]" />
            <span className="text-[#E8621A] text-sm font-semibold tracking-widest uppercase">Media Resources</span>
          </div>
          <h2 className="text-4xl font-bold text-white tracking-tight">广告资源</h2>
          <p className="text-white/40 mt-4 leading-relaxed">
            独家代理央视核心频道黄金时段资源，为品牌构建权威背书与精准传播覆盖
          </p>
        </div>

        {/* Hot resources — first row */}
        <div className={`grid md:grid-cols-3 gap-5 mb-5 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {resources.filter((r) => r.isHot).slice(0, 3).map((r, i) => (
            <div key={r.id}
              className="group relative bg-[#0f1f3a] border border-white/[0.08] rounded-2xl p-7 hover:border-[#1B5FBE]/40 transition-all hover:bg-[#0f1f3a]/80 cursor-pointer">
              {/* Top accent */}
              <div className="absolute top-0 left-7 right-7 h-px bg-gradient-to-r from-transparent via-[#1B5FBE]/60 to-transparent" />
              {i === 0 && <div className="absolute top-0 left-7 h-px w-16 bg-[#E8621A]" />}

              <div className="flex items-start justify-between mb-5">
                <span className="text-xs font-semibold tracking-wider text-[#E8621A] uppercase border border-[#E8621A]/40 rounded px-2 py-0.5">
                  {r.channel}
                </span>
                <span className="text-xs text-[#E8621A] font-medium bg-[#E8621A]/12 px-2.5 py-1 rounded-full">
                  热门
                </span>
              </div>

              <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#1B5FBE] transition-colors">{r.program}</h3>
              {r.timeSlot && (
                <p className="text-white/30 text-sm mb-4">{r.timeSlot}</p>
              )}
              {r.description && (
                <p className="text-white/50 text-sm leading-relaxed line-clamp-3">{r.description}</p>
              )}

              <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-white/30 text-xs">{r.price || "价格面议"}</span>
                <span className="text-[#1B5FBE] text-xs font-medium group-hover:translate-x-1 transition-transform">
                  了解更多 →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Other resources */}
        {resources.filter((r) => !r.isHot).length > 0 && (
          <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {resources.filter((r) => !r.isHot).map((r) => (
              <div key={r.id}
                className="bg-[#0a1729] border border-white/[0.05] rounded-xl p-5 hover:border-white/[0.12] transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-white/40 font-medium">{r.channel}</span>
                </div>
                <h4 className="text-white font-semibold text-sm mb-1">{r.program}</h4>
                {r.timeSlot && <p className="text-white/25 text-xs">{r.timeSlot}</p>}
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className={`mt-16 text-center transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <a href="#contact"
            className="inline-flex items-center gap-2.5 bg-[#E8621A] hover:bg-[#d45717] text-white px-8 py-3.5 rounded-md font-semibold text-sm transition-colors">
            获取完整资源报价
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

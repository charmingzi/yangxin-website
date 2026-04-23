"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const stats = [
  { value: "20+", label: "年行业经验" },
  { value: "AAAA", label: "央视信用等级" },
  { value: "500+", label: "服务品牌" },
  { value: "1000+", label: "成功案例" },
];

const services = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "央视广告代理",
    desc: "CCTV-1、CCTV-4、央视新闻等黄金时段，精准覆盖目标人群，助力品牌高效传播",
    href: "/services",
    color: "#e8621a",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    title: "融媒体传播",
    desc: "整合电视、网络、移动端多屏联动，打造全方位品牌传播矩阵",
    href: "/services#media",
    color: "#1B5FBE",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "品牌全案策划",
    desc: "从策略到执行，一站式品牌建设服务，为政企量身定制专属传播方案",
    href: "/services#brand",
    color: "#e8621a",
  },
];

const whyUs = [
  { num: "01", title: "央视AAAA信用代理", desc: "最高级别信用认证，资质权威，资源优先" },
  { num: "02", title: "黄金时段独家资源", desc: "《朝闻天下》《新闻30分》等头部栏目一手代理权" },
  { num: "03", title: "专业团队护航", desc: "20年深耕央视媒体，专业策划执行团队全程服务" },
  { num: "04", title: "全案整合能力", desc: "从TVC拍摄到投放监测，提供端到端品牌传播服务" },
];

export default function Home() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Background CCTV building */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/cctv-building.jpg')" }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f2b5c]/90 via-[#0f2b5c]/70 to-[#0f2b5c]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          {/* Breadcrumb label */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-px bg-[#e8621a]" />
            <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">
              CCTV AAAA 信用广告代理
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-4">
            央信合赢
            <br />
            <span className="text-[#e8621a]">成就品牌价值</span>
          </h1>
          <p className="text-white/70 text-base lg:text-lg max-w-lg mb-8 leading-relaxed">
            立足央视核心媒体资源，深耕品牌传播20年，为政企量身定制融媒体整合传播解决方案
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#e8621a] hover:bg-[#d45717] text-white font-semibold px-7 py-3.5 rounded-md transition-all hover:gap-3"
            >
              了解我们的服务
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            {/* Play video button */}
            <button
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-2.5 border border-white/30 hover:border-white/60 text-white/90 hover:text-white px-6 py-3.5 rounded-md font-medium text-sm transition-all backdrop-blur-sm"
            >
              <svg className="w-5 h-5 text-[#e8621a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              观看公司宣传片
            </button>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-8 sm:gap-12">
            {stats.map((s) => (
              <div key={s.label} className="text-center sm:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-white">{s.value}</div>
                <div className="text-white/40 text-xs mt-0.5 tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ===== VIDEO MODAL ===== */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <video
              src="/yangxin-promo.mp4"
              controls
              autoPlay
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* ===== SERVICES ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-[#e8621a]" />
              <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Our Services</span>
              <div className="w-8 h-px bg-[#e8621a]" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#0f2b5c]">核心业务</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                href={s.href}
                className="group bg-[#f7f8fa] hover:bg-[#0f2b5c] rounded-2xl p-8 transition-all duration-300 border border-gray-100 hover:border-[#0f2b5c] hover:shadow-xl"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors"
                  style={{ backgroundColor: `${s.color}18` }}
                >
                  <div style={{ color: s.color }}>{s.icon}</div>
                </div>
                <h3 className="text-lg font-bold text-[#0f2b5c] group-hover:text-white mb-2 transition-colors">{s.title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-white/60 leading-relaxed transition-colors">{s.desc}</p>
                <div className="flex items-center gap-1 mt-5 text-sm font-medium transition-colors" style={{ color: s.color }}>
                  了解更多
                  <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="py-24 bg-[#0f2b5c]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#e8621a]" />
                <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Why Choose Us</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                为什么选择
                <span className="text-[#e8621a]"> 央信合赢</span>
              </h2>
              <p className="text-white/50 text-base leading-relaxed mb-10">
                20年深耕央视媒体资源，累积服务超过1000个政企品牌，以专业、高效、真诚的服务态度，赢得客户广泛信赖
              </p>

              <div className="space-y-6">
                {whyUs.map((w) => (
                  <div key={w.num} className="flex gap-5">
                    <div className="text-[#e8621a] font-mono text-sm font-bold mt-1 shrink-0 w-8">{w.num}</div>
                    <div>
                      <h4 className="text-white font-semibold text-base mb-1">{w.title}</h4>
                      <p className="text-white/40 text-sm leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-[#e8621a] text-[#e8621a] hover:bg-[#e8621a] hover:text-white px-6 py-3 rounded-md font-semibold text-sm transition-all"
                >
                  了解更多
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* CCTV building photo */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/cctv-building-thumb.jpg"
                alt="央视总部大楼"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b5c]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold text-lg">北京 · 央视总部大楼</p>
                <p className="text-white/60 text-sm mt-1">CCTV Headquarters, Beijing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== RESOURCE PREVIEW ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-px bg-[#e8621a]" />
                <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Media Resources</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#0f2b5c]">核心广告资源</h2>
            </div>
            <Link
              href="/resources"
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#1B5FBE] hover:text-[#0f2b5c] transition-colors"
            >
              查看全部资源
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "CCTV-1 综合", slot: "《朝闻天下》", time: "06:00-08:30", color: "#e8621a", badge: "黄金时段" },
              { name: "CCTV-4 中文国际", slot: "《国家记忆》", time: "20:00-20:30", color: "#1B5FBE", badge: "国际覆盖" },
              { name: "CCTV-1 综合", slot: "《新闻30分》", time: "12:00-12:30", color: "#e8621a", badge: "午间黄金" },
              { name: "央视融媒体", slot: "央视频 APP", time: "全天候投放", color: "#1B5FBE", badge: "新媒体" },
            ].map((r) => (
              <div key={r.name} className="bg-[#f7f8fa] rounded-xl p-5 border border-gray-100 hover:border-[#1B5FBE]/30 hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-[#1B5FBE]">{r.badge}</span>
                  <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: r.color }} />
                </div>
                <h3 className="text-base font-bold text-[#0f2b5c] mb-1">{r.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{r.slot}</p>
                <p className="text-xs text-gray-400">{r.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/cctv-building.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0f2b5c]/85" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">开启品牌传播新篇章</h2>
          <p className="text-white/60 text-base mb-8">立即联系我们，获取专属央视广告投放方案，让品牌价值触达亿万观众</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="bg-[#e8621a] hover:bg-[#d45717] text-white font-semibold px-8 py-4 rounded-md transition-all text-sm">
              获取方案报价
            </Link>
            <Link href="/resources" className="border border-white/30 hover:border-white/60 text-white hover:bg-white/5 px-8 py-4 rounded-md transition-all text-sm">
              浏览广告资源
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

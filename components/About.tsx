"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const features = [
    { icon: "📺", title: "权威媒体", desc: "央视核心频道黄金时段", color: "bg-[#1B5FBE]/8 border-[#1B5FBE]/20" },
    { icon: "🎯", title: "精准传播", desc: "覆盖高端受众群体", color: "bg-[#E8621A]/8 border-[#E8621A]/20" },
    { icon: "🤝", title: "专业团队", desc: "资深广告策划执行", color: "bg-[#1B5FBE]/8 border-[#1B5FBE]/20" },
    { icon: "📊", title: "全案服务", desc: "融媒体整合营销", color: "bg-[#E8621A]/8 border-[#E8621A]/20" },
  ];

  return (
    <section id="about" className="py-28 bg-[#f8f7f5]">
      <div ref={ref} className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className={`max-w-2xl mb-16 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#E8621A]" />
            <span className="text-[#E8621A] text-sm font-semibold tracking-widest uppercase">About Us</span>
          </div>
          <h2 className="text-4xl font-bold text-[#0f172a] tracking-tight">关于我们</h2>
          <p className="text-gray-500 mt-4 leading-relaxed">
            十余年深耕，专注于将央视权威媒体平台与创新传播策略深度融合，
            助力品牌实现传播价值最大化。
          </p>
        </div>

        <div className={`grid lg:grid-cols-5 gap-16 items-start transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

          {/* Left — text */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-[#374151] leading-loose text-base">
              <strong className="text-[#0f172a]">央信合赢（北京）文化传媒有限公司</strong>
              是中央广播电视总台
              <strong className="text-[#1B5FBE]"> AAAA 级别信用广告代理公司</strong>，
              拥有央视核心黄金时段广告资源的独家代理权。
            </p>
            <p className="text-[#374151] leading-loose text-base">
              公司深耕广告传媒行业十余年，为众多知名品牌提供融媒体全案传播服务，
              覆盖《朝闻天下》《新闻30分》、CCTV-4 晚间黄金档等头部资源，
              触达全球华语受众。
            </p>
            <p className="text-[#374151] leading-loose text-base">
              2025 年 10 月，公司以央视 4A 级广告代理身份亮相第 32 届中国国际广告节，
              与全球 30 余国广告精英共襄盛举，全面展示独家代理的央视核心优质资源。
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-px bg-gray-200 rounded-xl overflow-hidden mt-10">
              {[
                { v: "AAAA", l: "央视信用等级" },
                { v: "10+", l: "年行业深耕" },
                { v: "100+", l: "服务品牌" },
              ].map((s) => (
                <div key={s.l} className="bg-white p-6 text-center">
                  <div className="text-2xl font-bold text-[#1B5FBE]">{s.v}</div>
                  <div className="text-xs text-gray-400 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className={`rounded-2xl p-5 border ${f.color} transition-all hover:shadow-md`}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="font-bold text-[#0f172a] text-sm">{f.title}</h4>
                <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

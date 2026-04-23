"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/public/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSuccess(true);
      setForm({ name: "", company: "", phone: "", email: "", message: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#E8621A]" />
            <span className="text-[#E8621A] text-sm font-semibold tracking-widest uppercase">Contact Us</span>
          </div>
          <h2 className="text-4xl font-bold text-[#0f172a] tracking-tight">联系我们</h2>
          <p className="text-gray-400 mt-3">期待与您携手，共创品牌传播新高度</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-16">

          {/* Left — info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">联系方式</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B5FBE]/8 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-4 h-4 text-[#1B5FBE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">地址</p>
                    <p className="text-sm text-[#374151]">北京市朝阳区酒仙桥东路9号院<br />电子城科技研发中心</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#1B5FBE]/8 flex items-center justify-center mt-0.5 shrink-0">
                    <svg className="w-4 h-4 text-[#1B5FBE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">电话</p>
                    <p className="text-sm text-[#374151]">010-8622 9581</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certification badge */}
            <div className="bg-[#f8f7f5] rounded-2xl p-6 border border-gray-100">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">资质认证</p>
              <div className="flex items-center gap-4">
                <div className="bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
                  <img src="/cctv-credentials.jpg" alt="CCTV" className="h-8 w-auto opacity-70" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0f172a]">AAAA</p>
                  <p className="text-xs text-gray-400">央视信用等级</p>
                </div>
              </div>
            </div>

            {/* Core resources */}
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">核心资源</p>
              <div className="space-y-2">
                {[
                  "CCTV-1《朝闻天下》《新闻30分》",
                  "CCTV-4 晚间黄金档节目",
                  "上下午剧场时段广告",
                  "融媒体全案传播服务",
                ].map((r) => (
                  <div key={r} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1 h-1 rounded-full bg-[#1B5FBE]" />
                    {r}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-[#f8f7f5] rounded-2xl p-8 lg:p-10 border border-gray-100">
              <h3 className="text-lg font-bold text-[#0f172a] mb-1">在线留言</h3>
              <p className="text-sm text-gray-400 mb-8">我们将在 24 小时内与您联系</p>

              {success ? (
                <div className="text-center py-16">
                  <div className="w-14 h-14 rounded-full bg-[#1B5FBE]/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-[#1B5FBE]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-[#0f172a]">提交成功</p>
                  <p className="text-sm text-gray-400 mt-1">感谢您的留言，我们会在 24 小时内尽快与您联系</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">姓名 <span className="text-[#E8621A]">*</span></label>
                      <input type="text" required value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:border-[#1B5FBE] focus:ring-1 focus:ring-[#1B5FBE]/20 focus:outline-none transition" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">公司</label>
                      <input type="text" value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:border-[#1B5FBE] focus:ring-1 focus:ring-[#1B5FBE]/20 focus:outline-none transition" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">电话 <span className="text-[#E8621A]">*</span></label>
                      <input type="tel" required value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:border-[#1B5FBE] focus:ring-1 focus:ring-[#1B5FBE]/20 focus:outline-none transition" />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-500 mb-1.5 block">邮箱</label>
                      <input type="email" value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:border-[#1B5FBE] focus:ring-1 focus:ring-[#1B5FBE]/20 focus:outline-none transition" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 mb-1.5 block">留言内容 <span className="text-[#E8621A]">*</span></label>
                    <textarea required rows={5} value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-[#0f172a] placeholder-gray-300 focus:border-[#1B5FBE] focus:ring-1 focus:ring-[#1B5FBE]/20 focus:outline-none transition resize-none" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full bg-[#E8621A] hover:bg-[#d45717] text-white font-semibold py-3.5 rounded-lg transition-colors text-sm disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? (
                      <span>提交中...</span>
                    ) : (
                      <>
                        提交留言
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Link from "next/link";

const services = [
  {
    id: "cctv",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <rect x="6" y="14" width="52" height="36" rx="4" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M18 50h28M32 50v6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <rect x="14" y="22" width="36" height="20" rx="2" fill="currentColor" opacity="0.12"/>
        <path d="M14 42h36" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    title: "央视广告代理",
    subtitle: "CCTV Gold Time Advertising",
    color: "#e8621a",
    points: [
      "CCTV-1 综合频道：《朝闻天下》《新闻30分》《今日说法》等黄金时段",
      "CCTV-4 中文国际频道：《国家记忆》等精品栏目，覆盖全球华人用户",
      "央视频APP新媒体资源：短视频、直播、信息流广告",
    ],
    desc: "我们拥有央视全频道广告资源代理资质，深耕央视媒体20年，与总台保持长期深度合作关系，可为企业提供最具性价比的央视广告投放方案。",
  },
  {
    id: "media",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="2.5"/>
        <ellipse cx="32" cy="32" rx="24" ry="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M8 32h48M32 8v48" stroke="currentColor" strokeWidth="2"/>
        <circle cx="32" cy="32" r="5" fill="currentColor" opacity="0.25"/>
      </svg>
    ),
    title: "融媒体传播",
    subtitle: "Integrated Media Communication",
    color: "#1B5FBE",
    points: [
      "电视+网络+移动端多屏联动传播矩阵",
      "央视频APP开屏、信息流、贴片广告",
      "微博、微信、抖音、小红书社交媒体整合",
      "今日头条、百度信息流精准投放",
      "线下活动+线上传播联动方案",
    ],
    desc: "在媒体碎片化时代，我们提供真正整合的多屏传播方案，让品牌信息在不同场景下持续触达目标人群，实现传播效果最大化。",
  },
  {
    id: "brand",
    icon: (
      <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
        <path d="M32 6L37 22H54L41 33L46 50L32 39L18 50L23 33L10 22H27L32 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
        <circle cx="32" cy="32" r="6" fill="currentColor" opacity="0.2"/>
      </svg>
    ),
    title: "品牌全案策划",
    subtitle: "Brand Strategy & Planning",
    color: "#e8621a",
    points: [
      "品牌定位与策略制定",
      "TVC广告创意设计与制作",
      "媒介排期优化与精准投放",
      "传播效果监测与数据分析",
      "品牌升级与年度传播规划",
    ],
    desc: "从品牌战略到创意执行，我们提供端到端的品牌传播服务。专业策划团队深谙市场，精通传播，助力企业打造有影响力的品牌。",
  },
];

const process = [
  { step: "01", title: "需求沟通", desc: "深入了解企业品牌定位、传播目标与预算" },
  { step: "02", title: "方案制定", desc: "量身定制央视+融媒体整合传播方案" },
  { step: "03", title: "合同签订", desc: "明确权益与交付标准，签订正式合作协议" },
  { step: "04", title: "创意制作", desc: "专业团队完成TVC等创意内容制作" },
  { step: "05", title: "投放执行", desc: "按计划精准投放，全程监测优化" },
  { step: "06", title: "效果报告", desc: "提供投放数据分析报告，总结传播效果" },
];

export default function ServicesPage() {
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
            <span className="text-white text-sm">核心业务</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">核心业务</h1>
          <p className="text-white/50 text-base">央视黄金时段 · 融媒体全案传播 · 品牌价值提升</p>
        </div>
      </section>

      {/* Services detail */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {services.map((s, i) => (
              <div
                key={s.id}
                id={s.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Left: content */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div style={{ color: s.color }}>{s.icon}</div>
                    <div>
                      <h2 className="text-2xl font-bold text-[#0f2b5c]">{s.title}</h2>
                      <p className="text-xs text-gray-400 tracking-widest uppercase mt-0.5">{s.subtitle}</p>
                    </div>
                  </div>
                  <div className="w-10 h-0.5 mb-6" style={{ backgroundColor: s.color }} />
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                  <ul className="space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: s.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
                      style={{ color: s.color }}
                    >
                      获取方案报价
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Right: clean icon card */}
                <div className={`flex flex-col items-center justify-center rounded-2xl p-12 border-2 ${i % 2 === 1 ? "" : "lg:ml-8"}`} style={{ borderColor: `${s.color}20`, backgroundColor: `${s.color}06` }}>
                  <div style={{ color: s.color }}>{s.icon}</div>
                  <p className="text-lg font-bold mt-4" style={{ color: s.color }}>{s.title}</p>
                  <p className="text-sm text-gray-400 mt-1">CCTV AAAA 信用广告代理</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-[#e8621a]" />
              <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Our Process</span>
              <div className="w-8 h-px bg-[#e8621a]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0f2b5c]">服务流程</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {process.map((p, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow relative">
                <div className="absolute top-4 right-4 text-4xl font-bold text-[#0f2b5c]/5">{p.step}</div>
                <h3 className="text-base font-bold text-[#0f2b5c] mb-2">{p.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}

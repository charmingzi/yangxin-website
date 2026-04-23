import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Link from "next/link";

const team = [
  {
    name: "崔总",
    role: "总经理",
    desc: "20年央视媒体运营经验，深耕品牌传播领域",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <circle cx="32" cy="22" r="10" fill="white" fillOpacity="0.9"/>
        <path d="M12 54c0-11.046 8.954-20 20-20s20 8.954 20 20" fill="white" fillOpacity="0.9"/>
        <circle cx="46" cy="18" r="6" fill="#e8621a" fillOpacity="0.9"/>
        <path d="M43 18l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    bg: "from-[#0f2b5c] to-[#1a4080]",
  },
  {
    name: "曹总",
    role: "媒介总监",
    desc: "资深央视资源专家，精通各频道广告排期",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <circle cx="32" cy="22" r="10" fill="white" fillOpacity="0.9"/>
        <path d="M12 54c0-11.046 8.954-20 20-20s20 8.954 20 20" fill="white" fillOpacity="0.9"/>
        <rect x="40" y="10" width="14" height="10" rx="2" fill="#e8621a" fillOpacity="0.9"/>
        <path d="M43 13h8M43 17h5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bg: "from-[#1a3a6e] to-[#0f2b5c]",
  },
  {
    name: "远总",
    role: "策划总经理",
    desc: "品牌全案策划专家，服务过数十个知名品牌",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <circle cx="32" cy="22" r="10" fill="white" fillOpacity="0.9"/>
        <path d="M12 54c0-11.046 8.954-20 20-20s20 8.954 20 20" fill="white" fillOpacity="0.9"/>
        <path d="M40 20l3-3 4 4-3 3" fill="#e8621a" fillOpacity="0.9"/>
        <path d="M40 20l-4 4a2 2 0 000 2.8l1.2 1.2a2 2 0 002.8 0l4-4" fill="#e8621a" fillOpacity="0.9"/>
        <circle cx="47" cy="13" r="3" fill="#e8621a" fillOpacity="0.9"/>
      </svg>
    ),
    bg: "from-[#0d2550] to-[#1a3a6e]",
  },
  {
    name: "刘总",
    role: "客户总监",
    desc: "客户关系管理专家，全程护航项目执行",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-14 h-14">
        <circle cx="32" cy="22" r="10" fill="white" fillOpacity="0.9"/>
        <path d="M12 54c0-11.046 8.954-20 20-20s20 8.954 20 20" fill="white" fillOpacity="0.9"/>
        <path d="M40 22c0-1.1.9-2 2-2h6a2 2 0 012 2v2a4 4 0 01-4 4 4 4 0 01-4-4v-2z" fill="#e8621a" fillOpacity="0.9"/>
        <path d="M44 28v3M41 34h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    bg: "from-[#162f60] to-[#0f2b5c]",
  },
];

const honors = [
  { img: "/qualification-2026.png", title: "2026年央视广告代理资格证书" },
  { img: "/qualification-2025-cctv.png", title: "2025年央视广告代理资格证书" },
  { img: "/qualification-2025.jpg", title: "2025年AAAA级信用广告代理公司" },
  { img: "/qualification-2024.jpg", title: "2024年AAAA级信用广告代理公司" },
];

// Solid color icons: mission=target, vision=eye, values=handshake
const cultureIcons = [
  {
    title: "使命",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    text: "让中国品牌的声音传遍世界",
  },
  {
    title: "愿景",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    text: "成为政企最信赖的央视媒体合作伙伴",
  },
  {
    title: "价值观",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.5 5.875C3.5 4.68 4.467 3.713 5.662 3.713h12.676C19.533 3.713 20.5 4.68 20.5 5.875v12.25c0 1.196-.967 2.162-2.162 2.162H5.662A2.162 2.162 0 013.5 18.125V5.875zM6 9a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm3 0a1 1 0 100-2 1 1 0 000 2zm9 0a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
    text: "诚信 · 专业 · 创新 · 共赢",
  },
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      {/* Page Hero */}
      <section className="relative h-[420px] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-[#0f2b5c]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#e8621a] to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="flex items-center gap-2 mb-4">
            <Link href="/" className="text-white/40 hover:text-white/70 text-sm transition-colors">首页</Link>
            <span className="text-white/30 text-sm">/</span>
            <span className="text-white text-sm">关于我们</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">关于我们</h1>
          <p className="text-white/50 text-base">了解央信合赢——您值得信赖的央视媒体合作伙伴</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-[#e8621a]" />
                <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">About Us</span>
              </div>
              <h2 className="text-3xl font-bold text-[#0f2b5c] mb-6">公司简介</h2>
              <div className="space-y-4 text-gray-500 text-sm leading-relaxed">
                <p>
                  央信合赢（北京）文化传媒有限公司，是经中央广播电视总台认证的 <strong className="text-[#0f2b5c]">AAAA级信用广告代理公司</strong>。公司立足央视核心媒体资源，深耕品牌传播领域，为政企提供从策略制定到媒体投放的一站式融媒体整合传播服务。
                </p>
                <p>
                  多年来，我们凭借专业的媒介策划能力、丰富的央视媒体资源和真诚的服务态度，成功服务了涵盖白酒、汽车、医药、互联网等多个行业的数百个知名品牌，赢得了客户的广泛认可与信赖。
                </p>
                <p>
                  我们相信，每一次品牌传播，都是与消费者建立信任的过程。央信合赢，愿与您携手，共同成就品牌价值。
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-8">
                {[{ v: "20+", l: "年行业经验" }, { v: "AAAA", l: "信用等级" }, { v: "1000+", l: "成功案例" }].map((s) => (
                  <div key={s.l} className="text-center p-4 bg-[#f7f8fa] rounded-xl">
                    <div className="text-xl font-bold text-[#0f2b5c]">{s.v}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden">
              <img src="/cctv-building.jpg" alt="央视大楼" className="w-full h-[380px] object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f2b5c]/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-bold">CCTV 中央电视台</p>
                <p className="text-white/60 text-sm">北京总部</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Culture - solid icon style */}
      <section id="culture" className="py-20 bg-[#f7f8fa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-[#e8621a]" />
              <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Our Culture</span>
              <div className="w-8 h-px bg-[#e8621a]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0f2b5c]">企业文化</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {cultureIcons.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 rounded-full bg-[#0f2b5c]/8 flex items-center justify-center mx-auto mb-5 text-[#0f2b5c]">
                  {c.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0f2b5c] mb-3">{c.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team with real photos */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-[#e8621a]" />
              <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Our Team</span>
              <div className="w-8 h-px bg-[#e8621a]" />
            </div>
            <h2 className="text-3xl font-bold text-[#0f2b5c]">核心团队</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((t) => (
              <div key={t.name} className="text-center group">
                <div className={`w-28 h-28 mx-auto mb-4 rounded-full bg-gradient-to-br ${t.bg} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300`}>
                  {t.icon}
                </div>
                <h4 className="font-bold text-[#0f2b5c]">{t.name}</h4>
                <p className="text-xs text-[#e8621a] font-medium mt-0.5">{t.role}</p>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Honors - real credential images, no categories */}
      <section id="honors" className="py-20 bg-[#0f2b5c]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="w-8 h-px bg-[#e8621a]" />
              <span className="text-[#e8621a] text-xs font-semibold tracking-[0.2em] uppercase">Honors</span>
              <div className="w-8 h-px bg-[#e8621a]" />
            </div>
            <h2 className="text-3xl font-bold text-white">资质荣誉</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {honors.map((h, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#e8621a]/10 transition-all group"
              >
                <div className="aspect-[4/3] bg-[#f7f8fa] overflow-hidden">
                  <img
                    src={h.img}
                    alt={h.title}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="text-sm font-semibold text-[#0f2b5c] leading-snug">{h.title}</p>
                </div>
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

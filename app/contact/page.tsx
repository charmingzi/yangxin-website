import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import Link from "next/link";

export default function ContactPage() {
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
            <span className="text-white text-sm">联系我们</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">联系我们</h1>
          <p className="text-white/50 text-base">期待与您携手，共创品牌传播新高度</p>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
